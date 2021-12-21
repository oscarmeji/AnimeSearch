window.addEventListener('load',()=>{
    const android = /android/i.test(navigator.userAgent);
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if((android || ios) 
            && !window.matchMedia('(display-mode: standalone)').matches
            && !navigator.standalone
            && !document.referrer.startsWith('android-app://')){
        
        var fit;
        function fit(){
            fit = document.body.appendChild(document.createElement('div'));
            fit.style.position='fixed';
            fit.style.bottom='0px';
            fit.style.width='100%';
            fit.style.textAlign='center';
            fit.style.backgroundColor='#ccc';
            fit.style.color='#333';
            fit.innerHTML='⬇ install this app ⬇';
        }
        if(android){
            window.addEventListener('beforeinstallprompt', e=>{
                e.preventDefault();
                window.installPrompt=e;
                fit();
                fit.onclick=()=>{
                    window.installPrompt.prompt();
                }
            });
        }else{
            let showInstructions;
            showInstructions=function(){
                fit.innerHTML=`Click <img style="height:1em !important" src="https://icon-library.com/images/share-icon-iphone/share-icon-iphone-20.jpg">, then click <br>Add to Home Screen.`;
                fit.onclick=()=>{
                    fit.innerHTML='⬇ install this app ⬇';
                    fit.onclick=showInstructions;
                }
            }
            fit();
            fit.onclick=showInstructions;
        }
    }
});