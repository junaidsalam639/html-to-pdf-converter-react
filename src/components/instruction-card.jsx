import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

const InstructionCard = () => {
    return (
        <>
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle className="font-bold text-xl">How to Use the Converter</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-start gap-3">
                            <div className="bg-blue-100 text-blue-600 rounded-full w-24 h-8 flex items-center justify-center font-bold">
                                1
                            </div>
                            <div>
                                <h3 className="font-bold text-xl mb-1">Write or Paste HTML</h3>
                                <p className="text-gray-600">
                                    Enter your <strong>HTML body content</strong> in the editor.
                                    You only need to provide the content that goes inside the <code>&lt;body&gt;</code> tags.
                                    We automatically include the HTML boilerplate and Tailwind CSS.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="bg-green-100 text-green-600 rounded-full w-24 h-8 flex items-center justify-center font-bold">
                                2
                            </div>
                            <div>
                                <h3 className="font-bold text-xl mb-1">Style with Tailwind CSS</h3>
                                <p className="text-gray-600">
                                    Use <strong>Tailwind CSS classes</strong> directly in your HTML.
                                    The preview will show exactly how your styled content will appear in the PDF.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="bg-purple-100 text-purple-600 rounded-full w-24 h-8 flex items-center justify-center font-bold">
                                3
                            </div>
                            <div>
                                <h3 className="font-bold text-xl mb-1">Download Your PDF</h3>
                                <p className="text-gray-600">
                                    Click the <strong>Download as PDF</strong> button to generate a print-ready PDF document.
                                    The converter preserves all your styling and layout.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-bold text-xl">Pro Tip:</h3>
                        <p className="text-gray-600 text-sm">
                            For best results, wrap your content in a <code>&lt;div class="page"&gt;</code> element.
                            This creates proper PDF page margins and a white background.
                            Example: <code>&lt;div class="page bg-white p-8"&gt;Your content here&lt;/div&gt;</code>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default InstructionCard



