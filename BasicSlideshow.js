class BasicSlideshow{
	
	//-----------------
	//--BASIC SLIDESHOW--
	//-----------------
	//
	//@author Filippo Maria Grilli
	//@github crikfilippo
	//@version 1.0.0
	//@since 2026-05-25
	//@license MIT
	//@link https://github.com/crikfilippo/BasicSlideshow
	//
	//-----------------
	//---USE EXAMPLE---
	//-----------------
	//
	//let slideshow = new BasicSlideshow({'wrapperQuery':'#my-slideshow' ,'isLogEnabled':true});
	//slideshow.addSlide({ texts:{ title:'Lorem Ipsum' }, href:'https://example.com', target:'_blank', image:{ url:'/img/slide.jpg' } });
	//  
	
	instanceName = undefined;
	wrapper = undefined;
	isLogEnabled = undefined;
	defaultImageUrl = undefined;
	slides = undefined;
	convertDefaultToB64 = undefined;
	logger = undefined;
	
	//constructor
	constructor(params = {}){

		const fName = 'constructor';

		try{

			//check and default params
			this.instanceName = params.instanceName ?? 'Basic Slideshow';
			this.isLogEnabled = params.isLogEnabled ?? true;
			try{ this.logger = new BasicConsoleLogger({instanceName : this.instanceName, isLogEnabled : this.isLogEnabled}); }
			catch(e){ this.logger = undefined; }
			this.log('loading...',fName);
			this.defaultImageUrl = params.defaultImageUrl ?? 'data:image/png;base64,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';
			this.convertDefaultToB64 = params.convertDefaultToB64 ?? false;
			this.slides = [];
			this.dummySlides = params.dummySlides ?? [{},{},{},{},{},{}];
			this.wrapper = document.querySelector(params.wrapperQuery ?? '#basic-slideshow');
			if(this.wrapper == undefined){ this.error('wrapper node not found ('+(params.wrapperQuery ?? '#basic-slideshow')+')',fName,true); }
			
			this.wrapper.innerHTML = '';
			this.wrapper.classList.add('basic-slideshow');
			this.scroller = document.createElement('div');
			this.scroller.classList.add('basic-slideshow-scroller');
			
			//image to base64
			if(this.convertDefaultToB64 && (params.defaultImageUrl ?? null) != null){
				
				this.remoteImageToBase64(this.defaultImageUrl).then((b64)=>{ this.defaultImageUrl = b64; });
				
			}
			
			//register and add slides
			for(var [index, slide] of (params.slides ?? this.dummySlides).entries()){
				slide.order = slide.order ?? index; 
				this.addSlide(slide); 
			}
			
			this.wrapper.appendChild(this.scroller);
				
		}catch(e){ this.error(e,fName,true); }
	}
	
	//add single slide to the slideshow
	addSlide(slide = {},asyncLoad = false){
		
		const fName = 'addSlide';
		this.log('adding slide',fName);
		
		const fn = async ()=>{

			try{

				this.slides.push({});
				var s = (this.slides.length - 1);

				this.slides[s].slide = document.createElement('a');
				this.slides[s].image = document.createElement('div');
				this.slides[s].texts = document.createElement('div');
				this.slides[s].title = document.createElement('div');

				this.slides[s].slide.style.order = (slide.order ?? 999);
				this.slides[s].slide.classList.add('basic-slideshow-slide');
				this.slides[s].slide.setAttribute('href', (slide.href ?? '#'));
				this.slides[s].slide.setAttribute('target', (slide.target ?? '_self'));

				this.slides[s].title.innerText = (slide.texts?.title ?? 'Lorem Ipsum');						
				this.slides[s].title.classList.add('basic-slideshow-title');

				this.slides[s].image.style.background = 'url(' + (slide.image?.url ?? this.defaultImageUrl) + '), url('+ this.defaultImageUrl +'), black ';
				this.slides[s].image.classList.add('basic-slideshow-image');

				this.slides[s].slide.appendChild(this.slides[s].image);
				this.slides[s].texts.appendChild(this.slides[s].title);
				this.slides[s].slide.appendChild(this.slides[s].texts);

				this.scroller.appendChild(this.slides[s].slide);

				if(Object.keys(slide).length === 0){this.slides[s].slide.classList.add('basic-slideshow-slide-dummy');}
				else{this.scroller.querySelectorAll('.basic-slideshow-slide-dummy').forEach((d)=>{d.style.display = 'none';});}

			}catch(e){ this.error(e,fName,true); }
		
		} 
		
		if( ! asyncLoad ){ fn(); return; }
		
		//async loading
		window.setTimeout( async ()=>{ fn(); }, 10 );
	
	} 
	
	//convert remote image to base64
	async remoteImageToBase64(url) {
		
		const fName = 'remoteImageToBase64';
		this.log('converting remote image to base64',fName);
		
		try{

			const response = await fetch(url);
			const blob = await response.blob();
			return new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.onloadend = () => resolve(reader.result);
				reader.onerror = reject;
				reader.readAsDataURL(blob);
			});
			
		}catch(e){ this.error(e,fName,true); }
	}

	//logging utility
	log(a,b,c,d){ if(this.logger == undefined){ console.log(a,b,c,d); }else{ this.logger.log(a,b,c,d); } }
	error(a,b,c){ if(this.logger == undefined){ console.error(a,b,c); }else{ this.logger.error(a,b,c); } }
	warn(a,b){ if(this.logger == undefined){ console.warn(a,b); }else{ this.logger.warn(a,b); } }
}