const Inspectlet = ({ wid }: { wid: string }) => {
  if (!wid) return null;
  
  return (
    <script 
      id="inspectlet-script-interaction"
      dangerouslySetInnerHTML={{
        __html: `
          function loadInspectlet() {
            window.__insp = window.__insp || [];
            window.__insp.push(['wid', '${wid}']);
            var ldinsp = function() {
              if(typeof window.__inspld != "undefined") return;
              window.__inspld = 1;
              var insp = document.createElement('script');
              insp.type = 'text/javascript';
              insp.async = true;
              insp.id = "inspsync";
              insp.src = 'https://cdn.inspectlet.com/inspectlet.js?wid=${wid}&r=' + Math.floor(new Date().getTime()/3600000);
              var x = document.getElementsByTagName('script')[0];
              x.parentNode.insertBefore(insp, x);
            };
            setTimeout(ldinsp, 0);
          }
          
          var loaded = false;
          function triggerLoad() {
            if (loaded) return;
            loaded = true;
            loadInspectlet();
          }
          
          // Load on first user interaction
          ['scroll', 'mousedown', 'touchstart', 'keydown', 'mousemove'].forEach(function(event) {
            window.addEventListener(event, triggerLoad, { once: true });
          });
          
          // Or after 5 seconds (whichever comes first)
          setTimeout(triggerLoad, 5000);
        `
      }}
    />
  );
};

export default Inspectlet;
