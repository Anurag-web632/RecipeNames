const searchbox = document.querySelector('.searchbox')
const searchbtn = document.querySelector('.serchbtn')
const recipecontainer = document.querySelector('.recipe-container')
const closebtn = document.querySelector('.close-btn')
const recipiedetail = document.querySelector('.recipie-detail')
const recipedetailcontent = document.querySelector('.recipe-detail-content')



const fetchrecipe = async (accpet) => {
  recipecontainer.innerHTML = "searching recipe ......"

  try {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${accpet}`);
    const response = await data.json()
    recipecontainer.innerHTML = ""
    response.meals.forEach((meal) => {
      const recipediv = document.createElement('div')
      recipediv.classList.add('recipe')
      recipediv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p>belongs to <span>${meal.strCategory}</span> category</p>
        `
      const buttons = document.createElement('button')
      buttons.textContent = "View Recipe"
      recipediv.appendChild(buttons)
      recipecontainer.appendChild(recipediv)

      buttons.addEventListener('click', () => {
        poprecipe(meal)
      })

    });

  } catch {
    recipecontainer.innerHTML = '404'
  }

}
const Ingredentlist = (meal) => {
  let ingredentlists = ""
  for (i = 1; i <= 20; i++) {
    const ingredent = meal[`strIngredient${i}`]
    if (ingredent) {
      const measure = meal[`strMeasure${i}`]
      ingredentlists += `<li>${measure} ${ingredent}</li>`
    } else {
      break;
    }
  }
  return ingredentlists;
}

const poprecipe = (meal) => {
  recipedetailcontent.innerHTML = `
  <h2 class="RecipeName">${meal.strMeal}</h2>
  <h3>Ingredents:</h3>
  <ul class="Ingredentlist">${Ingredentlist(meal)}</ul>
     <div class="instruction-div">
       <h3>Instructions:</h3>
       <p class="Instructions">${meal.strInstructions}</p>
    </div>

  `

  console.log(meal.strMeal)
  recipedetailcontent.parentElement.style.display = "block"
}


searchbtn.addEventListener('click', (e) => {
  e.preventDefault()
  const searchinput = searchbox.value.trim();
  fetchrecipe(searchinput)
})

closebtn.addEventListener('click',function(){
  recipedetailcontent.parentElement.style.display = 'none'
})