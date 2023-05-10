
function imagesInit() {
    const images = document.querySelectorAll('.box__container--image');
    if (images.length) {
        images.forEach(image => {
            const imageItem = image.querySelector('img');
            const padding = imageItem.offsetHeight / imageItem.offsetWidth * 100;
            image.style.paddingBottom = `${padding}%`
            imageItem.classList.add('init')
        })
    }
}

function gridInit() {
    const items = document.querySelector('.articles__grid')
    const itemsGrid = new Isotope(items, {
        itemSelector: '.articles__box',
        masonry: {
            fitWidth: true,
            gutter: 30,
            columnWidth: 60,
         }

    });


    
    document.addEventListener('click', documentActions);

    function documentActions(e) {
        const targetElement = e.target;
        if(targetElement.closest('.filter-content__item')) {
            const filterItem = targetElement.closest('.filter-content__item')
            const filterValue = filterItem.dataset.filter;
            const filterActiveItem = document.querySelector('.filter-content__item.active')

            filterValue === '*' ? itemsGrid.arrange({filter:``}):
                itemsGrid.arrange({filter:`[data-filter='${filterValue}']`})

            filterActiveItem.classList.remove('active')
            filterItem.classList.add('active')

     

            e.preventDefault()
        }
    }
}



window.addEventListener('load', windowLoad);

function windowLoad() {
    imagesInit()
    gridInit()
}




// Drodown menu

const dropdownButton = document.querySelector('.dropdown-button');
const dropdownContent = document.querySelector('.dropdown-content');


function menuDisplayComment() {

dropdownButton.addEventListener("mouseenter", function() {
    dropdownContent.style.display = "block";
  });
  dropdownButton.addEventListener("mouseleave", function() {
    dropdownContent.style.display = "none";
  });

}


if (window.innerWidth >= 768) {
    menuDisplayComment();
  }


const formSurvay = document.getElementById("survey");

formSurvay.addEventListener("submit", event => {
  event.preventDefault();
});
