	myBtn.onclick = createNewWind;
	function showCover() {
      let coverDiv = document.createElement('div');
      coverDiv.id = 'cover-div';
		
      // убираем возможность прокрутки страницы во время показа модального окна с формой
      document.body.style.overflowY = 'hidden';

      document.body.append(coverDiv);
      
    }
	
	function hideCover() {
      document.getElementById('cover-div').remove();
      document.body.style.overflowY = '';
    }
	
	function createNewElem(name, category, prise, img = 'no_photo.png') {
			try {
				if (img == '') img = 'no_photo.png';
			document.querySelector('ul').lastElementChild.insertAdjacentHTML("beforebegin", `<li class="product-wrapper">
		<div class="product">
			<div class="product-photo">
				<img src=${img} alt="">
			</div>
			<div class="product-description">
				<button class="remove-button">[x]</button>
				<div class="product-name"> 
					<h3>${name}<h3>
				</div>
				<p class="product-category"> 
					${category} 
				</p>
				<h3 class="product-price"> 
					${prise}
				</h3>
			</div>
		</div>
	</li>`);
	}
		catch(err)
		{
			alert(err.name); // ReferenceError
			alert(err.message); // lalala is not defined
			alert(err.stack);
		}
		let bytton = document.querySelectorAll('.product-wrapper');
		bytton[bytton.length - 2].onclick = function(event) {
		if (event.target.className != 'remove-button') return;
		let pane = event.target.closest('.product-wrapper');
		pane.remove();
		}
	}
			
			
	function createNewWind() {
      showCover();
      let form = document.getElementById('prompt-form');
      let container = document.getElementById('prompt-form-container');
      form.name.value = '';
		form.category.value = '';
		 form.price.value = '';
		 

      function delet(value) {
        console.log(';;;');
        if (value)
			createNewElem(form.name.value, form.category.value, form.price.value, form.img.value);
		hideCover();
        container.style.display = 'none';
        document.onkeydown = null;
      }
	
		
		form.onsubmit = function() {
			console.log(';;;' + form.name.value + form.category.value + form.price.value);
        if (form.name.value == '' || form.category.value == '' || form.price.value == '') return false;
			delet(true);
			return false;
        
        
      };

     form.cancel.onclick = function() {
        delet(null);
      }

      document.onkeydown = function(e) {
        if (e.key == 'Escape') {
          delet(null);
        }
      };
	  form.price.onfocus = function() {
		  if (this.classList.contains('invalid')) {
			this.classList.remove('invalid');
			}
	  };
	  form.price.onblur = function() {
		if (form.price.value[0] != '$') { // не email
			form.price.classList.add('invalid');
			form.price.value = '';
			error.innerHTML = 'Цена должна начинаться с $ и содержать только цыфры.'
		}
	};
		container.style.display = 'block';
		container.style.top = Math.round((document.documentElement.clientHeight - container.clientHeight)/2) + 'px';
		container.style.left = Math.round((document.documentElement.clientWidth - container.clientWidth)/2) + 'px';
		console.log(container.clientHeight + " " + container.clientWidth + " " + document.documentElement.clientHeight);
      
	}
	window.onbeforeunload = function() {
		localStorage.clear()
		let name = document.querySelectorAll('.product-name');
		for(let k = 0; k< name.length;k++)
			localStorage[`name${k}`] = name[k].firstElementChild.innerHTML;
		
		let category = document.querySelectorAll('.product-category');
		for(let k = 0; k< category.length;k++)
			localStorage[`category${k}`] = category[k].innerHTML;
		
		let price = document.querySelectorAll('.product-price');
		for(let k = 0; k< price.length;k++)
			localStorage[`price${k}`] = price[k].innerHTML;
		
		let photo = document.querySelectorAll('.product-photo');
		for(let k = 0; k< price.length;k++)
			localStorage[`photo${k}`] = photo[k].firstElementChild.src;
		/*name = document.querySelectorAll('.product-price');
		list.length = 0;
		for(let k of name)
			list.push(k.firstElementChild.innerHTML);
		localStorage['price'] = list;*/
		return false;
	};
	
	function load() {
		for(let k = 0; k < localStorage.length/4;k++)
			createNewElem(localStorage.getItem(`name${k}`), localStorage.getItem(`category${k}`)
		, localStorage.getItem(`price${k}`), localStorage.getItem(`photo${k}`));
  }

  document.addEventListener("DOMContentLoaded", load);
	
    