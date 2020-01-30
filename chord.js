(function()  {
    let amScript = document.createElement('script');
    let amScript2 = document.createElement('script');
    let amScript3 = document.createElement('script');

    amScript.src = 'https://www.amcharts.com/lib/4/core.js';
    amScript2.src = 'https://www.amcharts.com/lib/4/charts.js';
    amScript3.src = 'https://www.amcharts.com/lib/4/themes/animated.js';

    amScript.async = false;
    amScript2.async = false;
    amScript3.async = false;
    
    document.head.appendChild(amScript);
    document.head.appendChild(amScript2);
    document.head.appendChild(amScript3);

    let tmpl = document.createElement('template');
    tmpl.innerHTML = `
    am4core.ready(function() {

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end
        
        var chart = am4core.create("chartdiv", am4charts.ChordDiagram);
        chart.hiddenState.properties.opacity = 0;
        
        chart.data = [
            { from: "A", to: "D", value: 10 },
            { from: "B", to: "D", value: 8 },
            { from: "B", to: "E", value: 4 },
            { from: "B", to: "C", value: 2 },
            { from: "C", to: "E", value: 14 },
            { from: "E", to: "D", value: 8 },
            { from: "C", to: "A", value: 4 },
            { from: "G", to: "A", value: 7 },
            { from: "D", to: "B", value: 1 }
        ];
        
        chart.dataFields.fromName = "from";
        chart.dataFields.toName = "to";
        chart.dataFields.value = "value";
        
        // make nodes draggable
        var nodeTemplate = chart.nodes.template;
        nodeTemplate.readerTitle = "Click to show/hide or drag to rearrange";
        nodeTemplate.showSystemTooltip = true;
        nodeTemplate.cursorOverStyle = am4core.MouseCursorStyle.pointer
        
        });
    `;

	class Chord extends HTMLElement {
		constructor() {
			super(); 
            
            this._shadowRoot = this.attachShadow({mode: 'open'});
            this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
            this.style.height = "100%";  //Beta Workaround
            this._svgContainer;
			
		}
				  
		//Fired when the widget is added to the html DOM of the page
        connectedCallback(){
            this.redraw();
        }

         //Fired when the widget is removed from the html DOM of the page (e.g. by hide)
        disconnectedCallback(){
        
        }

         //When the custom widget is updated, the Custom Widget SDK framework executes this function first
		onCustomWidgetBeforeUpdate(oChangedProperties) {

		}

        //When the custom widget is updated, the Custom Widget SDK framework executes this function after the update
		onCustomWidgetAfterUpdate(oChangedProperties) {

        }
        
        //When the custom widget is removed from the canvas or the analytic application is closed
        onCustomWidgetDestroy(){
        
        }

        
        //When the custom widget is resized on the canvas, the Custom Widget SDK framework executes the following JavaScript function call on the custom widget
        // Commented out by default
        /*
        onCustomWidgetResize(width, height){
        
        }
        */

        redraw(){}
	}
	
	customElements.define("com-demo-chord", Chord);
})();