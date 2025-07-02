import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Eye, Code } from "lucide-react"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import { buildFullHtml } from "./build-full-html"
import PreviewPdf from "./preview-pdf"
import InstructionCard from "./instruction-card"
import Editor from "@monaco-editor/react";


export default function HtmlToPdfConverter() {
    
    const [bodyHtmlContent, setBodyHtmlContent] = useState(
`<h1 class="text-3xl font-bold text-blue-700">Hello World</h1>
<p class="text-gray-600">This is a Tailwind-styled paragraph.</p>`)
    const [isGenerating, setIsGenerating] = useState(false)

    const generatePDF = async () => {
        setIsGenerating(true)
        try {
            const fullHtml = buildFullHtml(bodyHtmlContent)

            const iframe = document.createElement("iframe")
            iframe.style.position = "absolute"
            iframe.style.left = "-9999px"
            iframe.style.top = "0"
            iframe.style.width = "210mm"
            iframe.style.border = "none"
            document.body.appendChild(iframe)

            const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document
            if (!iframeDoc) throw new Error("Cannot access iframe document")

            iframeDoc.open()
            iframeDoc.write(fullHtml)
            iframeDoc.close()

            await new Promise((resolve) => setTimeout(resolve, 1000))

            const contentElement = iframeDoc.body
            const canvas = await html2canvas(contentElement, {
                scale: 2,
                useCORS: true,
                backgroundColor: "#ffffff",
            })

            document.body.removeChild(iframe)

            const imgData = canvas.toDataURL("image/png", 1.0)
            const pdf = new jsPDF("p", "mm", "a4")

            const pdfWidth = 210
            const imgWidth = canvas.width / 2
            const imgHeight = canvas.height / 2
            const scale = pdfWidth / imgWidth
            const scaledHeight = imgHeight * scale

            if (scaledHeight <= 297) {
                pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, scaledHeight)
            } else {
                let y = 0
                let remainingHeight = scaledHeight
                while (remainingHeight > 0) {
                    if (y > 0) pdf.addPage()
                    pdf.addImage(imgData, "PNG", 0, -y, pdfWidth, scaledHeight)
                    y += 297
                    remainingHeight -= 297
                }
            }
            pdf.save("html-design.pdf")
        } catch (error) {
            console.error("PDF generation error:", error)
            alert("Failed to generate PDF. Please check your HTML.")
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">HTML to PDF Converter</h1>
                    <p className="text-gray-600">Convert your HTML designs to professional PDF documents with Tailwind CSS support</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Code className="w-5 h-5" /> HTML Body Content
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Editor   
                            height="500px"
                            language="html"
                            theme="vs-dark"
                            value={bodyHtmlContent}
                            onChange={(value) => setBodyHtmlContent(value || "")}
                            options={{
                                fontSize: 14,
                                wordWrap: "on",
                                minimap: { enabled: false },
                                tabSize: 2,
                            }}
                        />
                        <Button
                            onClick={generatePDF}
                            disabled={!bodyHtmlContent.trim() || isGenerating}
                            className="w-full bg-green-600 hover:bg-green-700 cursor-pointer"
                        >
                            <Download className="w-4 h-4 mr-2" />
                            {isGenerating ? "Generating PDF..." : "Download as PDF"}
                        </Button>
                    </CardContent>
                </Card>

                <Card className="my-6">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Eye className="w-5 h-5" /> Live Preview
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="preview" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="preview">Preview</TabsTrigger>
                                <TabsTrigger value="code">Code View</TabsTrigger>
                            </TabsList>
                            <TabsContent value="preview" className="mt-4">
                                <div className="border rounded-lg bg-white min-h-[500px] overflow-hidden">
                                    <PreviewPdf htmlCode={buildFullHtml(bodyHtmlContent)} />
                                </div>
                            </TabsContent>
                            <TabsContent value="code" className="mt-4">
                                <div className="border rounded-lg p-4 bg-gray-50 min-h-[500px] overflow-auto">
                                    <pre className="text-sm text-gray-800 whitespace-pre-wrap">{bodyHtmlContent}</pre>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
                <InstructionCard />
            </div>
        </div>
    )
}

