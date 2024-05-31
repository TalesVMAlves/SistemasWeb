document.addEventListener('DOMContentLoaded', function() {
    function renderBarChart() {
        const vlSpec = {
            "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
            "title": {
                "text": "Qual o seu leitor de tela padrão?",
                "fontSize": 20,
                "anchor": "start"
            },
            "width": 600, 
            "height": 400, 
            "description": "Qual o seu leitor de tela padrão?",
            "data": {
                "values": [
                    { "Leitor de Tela": "Jaws", "Quantidade": 832 }, { "Leitor de Tela": "NVDA", "Quantidade": 476 }, { "Leitor de Tela": "Voice-Over", "Quantidade": 100 },
                    { "Leitor de Tela": "Zoom Text", "Quantidade": 72 }, { "Leitor de Tela": "System Access", "Quantidade": 12 }, { "Leitor de Tela": "Narrator", "Quantidade": 8 },
                    { "Leitor de Tela": "ChromeVox", "Quantidade": 5 }, { "Leitor de Tela": "Other", "Quantidade": 43 }
                ]
            },
            "mark": "bar",
            "encoding": {
                "x": { "field": "Leitor de Tela", "type": "nominal", "axis": { "labelAngle": 0 }, "sort": {"field": "Quantidade", "order": "descending"} },
                "y": { "field": "Quantidade", "type": "quantitative" }
            }
        };
        
        const vegaSpec = vegaLite.compile(vlSpec).spec;
        const runtime = vega.parse(vegaSpec);
        const vegaContainer = document.getElementById('bar-container');
        vegaContainer.innerHTML = ''; // Clear previous chart
        const view = new vega.View(runtime)
            .logLevel(vega.Warn)
            .initialize(vegaContainer)
            .renderer('svg')
            .hover()
            .run();
        
        // Clear the previous Olli content
        const olliContainer = document.getElementById('olli-bar-container');
        olliContainer.innerHTML = ''; 
        
        // Code to render the Olli treeview
        OlliAdapters.VegaLiteAdapter(vlSpec).then(olliVisSpec => {
            const olliRender = olli(olliVisSpec);
            olliContainer.append(olliRender);
        });
    }

    document.getElementById('barra-link').addEventListener('click', function(event) {
        event.preventDefault();
        renderBarChart();
        document.getElementById('myChart').style.display = 'none';
        document.getElementById('bar-container').style.display = 'block';
        document.getElementById('olli-bar-container').style.display = 'block';
    });
});
