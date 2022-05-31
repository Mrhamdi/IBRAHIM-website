

$.fn.hasAttr = function(name) {  
  return this.attr(name) !== undefined;
};

//Theme Switcher Panel
const mode_panel_init= () => {
  var activation = $('body').hasAttr('data-theme-mode-panel-active');
    // console.log(activation);
    let bodyactive = $('body').attr('data-theme');
    let defaultActive = (bodyactive == 'light' || bodyactive == undefined);
    console.log(defaultActive);

  
}

const mode_panel_activities = () => {
  $('.mode-switcher-panel').on("click",function(e){
    let button = document.querySelectorAll('.switcher-btn');
    let buttonPanel = document.querySelector('.switcher-minimize-button');
    button.forEach((btnItem) => {
      if(e.target == btnItem){
        e.target.classList.add('active');
        $(e.target).siblings().removeClass('active');
        let selectedMode = $('.switcher-btn.active').attr('data-theme-mode');
        $('body').attr('data-theme' , selectedMode);
      }
    })
    if(e.target == buttonPanel){
      $('body').toggleClass("theme-mode-panel-open");
      if($('body').hasClass("theme-mode-panel-open")){
        $(e.target).addClass("open");
      }else{
        $(e.target).removeClass("open");
      }
    }
  })

  window.addEventListener('load', (event) => {
    const mode = localStorage.getItem('color_mode');
    if (mode) {
      $('.switcher-btn.active').removeClass('active');
      $(`.switcher-btn[data-theme-mode=${mode}]`).addClass('active');
    }
  })
}
$(function() {
  mode_panel_init();
  mode_panel_activities();

  const colorPickers = [
    {
      selector: '.primary-color',
      variable: '--bs-primary-500'
    },
    {
      selector: '.primary-color',
      variable: '--bs-tertiary-500'
    },
    {
      selector: '.primary-color',
      variable: '--bs-gray-900'
    },
    {
      selector: '.primary-color',
      variable: '--bs-success-500'
    },
    {
      selector: '.primary-color',
      variable: '--bs-secondary-500'
    }
  ]
  const root = document.documentElement;
  colorPickers.forEach((color) => {
    const colorSets = document.querySelectorAll(color.selector);
    Array.from(colorSets).forEach((item) => {
      item.style.backgroundColor = item.dataset.color;

      item.addEventListener('click', (e) => {
        removeClassFromSiblings(colorSets);
        let clickedItem = e.target;
        clickedItem.classList.add('active');
        root.style.setProperty(color.variable, clickedItem.dataset.color);
      });
    })
  });
  function removeClassFromSiblings(colorSets){
    Array.from(colorSets).forEach((item) => {
      item.classList.remove('active');
    })
  }
})

// client dark lite changer
const toggleSwitch = document.querySelector(".toggle-button");
const documentBody = document.body;

toggleSwitch.addEventListener("change", function(e){
  const mode = e.target.checked === true ? 'dark' : 'light';
  documentBody.setAttribute("data-theme", mode);
});

window.addEventListener('load', () => {
  const mode = localStorage.getItem('color_mode') ?? 'light';
  document.body.setAttribute("data-theme", mode);
})

const observer = new MutationObserver(function() {
  const mode = documentBody.getAttribute('data-theme');

  localStorage.setItem('color_mode', mode);
  toggleSwitch.checked = mode === 'dark' ? true : false;
});

observer.observe(documentBody, {attributeFilter: ['data-theme']});
