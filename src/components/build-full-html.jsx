export const buildFullHtml = (bodyContent) => `
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
      body { font-family: 'Inter', sans-serif; }
      @page { size: A4; margin: 0; }
      .page {
        width: 220mm;
        padding: 10mm;
        margin: 10mm auto;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
    </style>
  </head>
  <body class="bg-gray-100">
  <div class="page bg-white">
    ${bodyContent}
    </div>
  </body>
</html>
`

