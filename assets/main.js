// dom
const changeThemeBtn = document.getElementById("btn-change-theme");
const bodyTag = document.querySelector("body");
const inputBtn = document.getElementById("btn-plus");
const inputText = document.getElementById("addf");
const ul = document.querySelector(".toDoList");
const filter = document.querySelector(".second-cards-nav");
const activeCardBtn = document.querySelector("#active");
const compliteCardBtn = document.querySelector("#complited");

// todo document function
function Main() {
  // change theme switch
  changeThemeBtn.addEventListener("click", () => {
    bodyTag.classList.toggle("light");
    const themeImg = changeThemeBtn.children[0];
    themeImg.setAttribute(
      "src",
      themeImg.getAttribute("src") ===
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAACCklEQVRIS9VWi03DQAztbVA2CBuUCUg3gA3SEZgAmAA2oBsAE9ANyAZkg3aD4FfZh3vxXdwIEVGpUpvz+fk9/xIWM33CTLiLScB931cUcMNBb0MI3bkEpgLXBPTBYGsC3v1/YJJzRSyWFhs6G2XMNge631pqmFIzKKRc0teUkh3DZ0vOD9o5n72qVAzAc8CaEe6786hAETQCuqPAtinrbHEpOXF5Q5ffElZIBaQ8qWhW67MECj/FqmZw5PkISv/B4p6+DadBYgGjRwmCwVcWU7ngbqck71a9QJlbb2u5gJnpl2IJBd4Z/ZoVwF+AX3kGihf4RTkHqzTfNZ3LQMEk21iS6GcRmMdgpQ5jm9AZ2OIs65RsJDgU3IWqCRShfDpRQwM/0CkKRz7HFlJViucDtmJMdjf0W3r3EgDJoIEpChA4P1VNRjlgVPKeAdCTz5aMCTDy3HqBIWVOagAjgJLUEniUmuWui1JbLJSMurgGU4zZwgbB7YjtuuTvROoRYC03TCE32gnPpZ1kRCIwczFoDFc7KcmkZaw4s3PZMvaMzLjaeJA8kaNGOQMgGGKedxxkdqXKvbElkV1tsm/JEXozrkXPSs3m2LvaLAmNFjJXaulFILvaWHKZSLkXAdSDuVKLVV1abWe8+sSVmqrjrmp90QP8K32cOpkTuFIt9Xcv9GMyes4n5djjeMzmG/HNLi5LcrQbAAAAAElFTkSuQmCC"
        ? "image/png/bx-moon.png"
        : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAACCklEQVRIS9VWi03DQAztbVA2CBuUCUg3gA3SEZgAmAA2oBsAE9ANyAZkg3aD4FfZh3vxXdwIEVGpUpvz+fk9/xIWM33CTLiLScB931cUcMNBb0MI3bkEpgLXBPTBYGsC3v1/YJJzRSyWFhs6G2XMNge631pqmFIzKKRc0teUkh3DZ0vOD9o5n72qVAzAc8CaEe6786hAETQCuqPAtinrbHEpOXF5Q5ffElZIBaQ8qWhW67MECj/FqmZw5PkISv/B4p6+DadBYgGjRwmCwVcWU7ngbqck71a9QJlbb2u5gJnpl2IJBd4Z/ZoVwF+AX3kGihf4RTkHqzTfNZ3LQMEk21iS6GcRmMdgpQ5jm9AZ2OIs65RsJDgU3IWqCRShfDpRQwM/0CkKRz7HFlJViucDtmJMdjf0W3r3EgDJoIEpChA4P1VNRjlgVPKeAdCTz5aMCTDy3HqBIWVOagAjgJLUEniUmuWui1JbLJSMurgGU4zZwgbB7YjtuuTvROoRYC03TCE32gnPpZ1kRCIwczFoDFc7KcmkZaw4s3PZMvaMzLjaeJA8kaNGOQMgGGKedxxkdqXKvbElkV1tsm/JEXozrkXPSs3m2LvaLAmNFjJXaulFILvaWHKZSLkXAdSDuVKLVV1abWe8+sSVmqrjrmp90QP8K32cOpkTuFIt9Xcv9GMyes4n5djjeMzmG/HNLi5LcrQbAAAAAElFTkSuQmCC"
    );
  });

  // call make and show element

  makeAndShowElement(JSON.parse(localStorage.getItem("todoapp")));

  // ul dragover event

  ul.addEventListener("dragover", (e) => {
    e.preventDefault();
    if (
      e.target.classList.contains("toDo-cards") &&
      !e.target.classList.contains("draging")
    ) {
      const dragingCard = document.querySelector(".draging");
      const cards = [...ul.querySelectorAll(".toDo-cards")];
      const oldPosition = cards.indexOf(dragingCard);
      const newPosition = cards.indexOf(e.target);
      console.log(oldPosition, newPosition);
      if (oldPosition > newPosition) {
        ul.insertBefore(dragingCard, e.target);
      } else {
        ul.insertBefore(dragingCard, e.target.nextSibling);
      }
      const todoapp = JSON.parse(localStorage.getItem("todoapp"));
      const remove = todoapp.splice(oldPosition, 1);
      console.log(remove);
      todoapp.splice(newPosition, 0, remove[0]);
      localStorage.setItem("todoapp", JSON.stringify(todoapp));
    }
  });

  // add todo value in localStorage
  inputBtn.addEventListener("click", () => {
    const item = inputText.value.trim();
    if (item) {
      inputText.value = "";
      const todoapp = !localStorage.getItem("todoapp")
        ? []
        : JSON.parse(localStorage.getItem("todoapp"));

      const finalyToDo = {
        item: item,
        isComplited: false,
      };
      todoapp.push(finalyToDo);
      localStorage.setItem("todoapp", JSON.stringify(todoapp));
      makeAndShowElement([finalyToDo]);
    }
  });

  // 
  inputText.addEventListener("keydown" , (e)=>{
    if (e.key == "Enter") {
      inputBtn.click();
    }
  });

  filter.addEventListener("click" , (e)=>{
    const id = e.target.id;
    if(id){
      document.querySelector(".on").classList.remove("on");
      document.getElementById(id).classList.add("on");
      document.querySelector(".toDoList").className = `toDoList ${id}`;
    }
  });

  

}

// remove todo
function removeTodo(index){
  const todoapp = JSON.parse(localStorage.getItem("todoapp"));
  todoapp.splice(index , 1);
  localStorage.setItem("todoapp" , JSON.stringify(todoapp));
}

function stateTodo(index , isComplit){
  const todoapp = JSON.parse(localStorage.getItem("todoapp"));
  todoapp[index].isComplited = isComplit;
  localStorage.setItem("todoapp" , JSON.stringify(todoapp));

}

// add element from localstorage to HTML document
function makeAndShowElement(todoArray) {
  if (!todoArray) {
    return null;
  }

  const leftItem = document.querySelector("#number-cards");

  todoArray.forEach((todoObject) => {
    // create HTML element
    const todoCards = document.createElement("li");
    const checkBox = document.createElement("div");
    const inputCheckB = document.createElement("input");
    const checkMark = document.createElement("span");
    const textInput = document.createElement("p");
    const clearInfoBtn = document.createElement("button");
    const img = document.createElement("img");
    // add class for HTML element
    todoCards.classList.add("toDo-cards");
    checkBox.classList.add("check-box");
    inputCheckB.classList.add("input-checkB");
    checkMark.classList.add("check");
    textInput.classList.add("text-input");
    clearInfoBtn.classList.add("clear-info");
    img.classList.add("clear-btn-li");
    // set attribute for HTML element
    todoCards.setAttribute("draggable", true);
    inputCheckB.setAttribute("type", "checkbox");
    img.setAttribute(
      "src",
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAABCklEQVRIS+2V0Q3CMAxEmw0YgRXYACYANoCJEBMwAt0ARmAUNgh3UiJVpXYcV6J8JFJ+GsfPvthu6BZaYSFu18A/U75J/T9SxxhXiOaGfQ0hPLXIYHvC+R52x1IGxTeGszucHJKjnQRP0AvsGGhfglvAWzh6DDL4go+gb9ieAe61rItgXoZjEe6B0qcJLMHxfY2d5TVlmlUwgwU4YXzTKmhVxjnSCdmroV4wWybLm+MRq10qsFqph9AsswtuBk9Vb3pbtdVmZay1jNZqs/rY0qceuCp1mtMcmRwgavWO4C9Mrs3cjNmnhPMnoY7BBGfFs8oZqLjMxaU58Zw1sEc1150mtUs2z6XFpP4Aw0N7H8sLgmQAAAAASUVORK5CYII="
    );
    img.setAttribute("alt", "clear it");
    textInput.textContent = todoObject.item;

    if (todoObject.isComplited) {
      todoCards.classList.add("checked");
      inputCheckB.setAttribute("checked" , "checked");

    }
    // add Event Listener
    clearInfoBtn.addEventListener("click" , (e)=>{
      const clearelement = clearInfoBtn.parentElement;
      console.log(clearelement);
      clearelement.classList.add("faild");
      const indexOfcurect = [...document.querySelectorAll(".toDoList .toDo-cards")].indexOf(clearelement);
      removeTodo(indexOfcurect);
      clearelement.addEventListener("animationend" , ()=>{
// in dastan edame dard ...
      });

    })
    // li tag drag event

    todoCards.addEventListener("dragstart", () => {
      todoCards.classList.add("draging");
    });
    todoCards.addEventListener("dragend", () => {
      todoCards.classList.remove("draging");
    });
    // check box input 
    inputCheckB.addEventListener("click" , ()=>{
      const curectInput = inputCheckB.parentElement.parentElement;
      const checked = inputCheckB.checked;
      const curextinputIndex = [...document.querySelectorAll(".toDoList .toDo-cards")].indexOf(curectInput);
      stateTodo(curextinputIndex , checked);
      checked ? curectInput.classList.add("checked") :curectInput.classList.remove("checked")
      leftItem.textContent =document.querySelectorAll(
        ".toDoList .toDo-cards:not(.checked)"
      ).length;
    });

    // set append child
    checkBox.appendChild(inputCheckB);
    checkBox.appendChild(checkMark);
    clearInfoBtn.appendChild(img);
    todoCards.appendChild(checkBox);
    todoCards.appendChild(textInput);
    todoCards.appendChild(clearInfoBtn);
    document.querySelector(".toDoList").appendChild(todoCards);
  });

  leftItem.textContent =document.querySelectorAll(
    ".toDoList .toDo-cards:not(.checked)"
  ).length;

}

document.addEventListener("DOMContentLoaded", Main);