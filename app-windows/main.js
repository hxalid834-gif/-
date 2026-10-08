const {app,BrowserWindow}=require('electron');
function w(){const win=new BrowserWindow({width:1280,height:840,title:'نەخۆشخانە',autoHideMenuBar:true,backgroundColor:'#081a21'});win.loadFile('www/index.html')}
app.whenReady().then(()=>{w();app.on('activate',()=>{if(!BrowserWindow.getAllWindows().length)w()})});
app.on('window-all-closed',()=>{if(process.platform!=='darwin')app.quit()});
