  const radio = document.getElementById('radio');

  const list = document.querySelector('ul');
  var input_to_do = $("#to-Do")
  let dragStartIndex;
  var colors = localStorage.getItem("color")
  var background = localStorage.getItem("background");
  var icon = localStorage.getItem('icon')
  $(".input-box").addClass(colors)
  $(".back").addClass(background)

  $("#to-Do,.footer,.main-container").addClass(colors);
  $(".icon").addClass(icon)
  const listItems = []

  loadEventListeners()

  function loadEventListeners() {
    // DOM Load event
    document.addEventListener('DOMContentLoaded', getItem);
    // Add task event

  }



  function change(ev) {
    if ($(ev.target).is(':checked')) {
      ev.target.parentElement.nextElementSibling.nextElementSibling.classList.add('checked');
      updatelocalstoragetochecked(ev.target.parentElement.nextElementSibling.nextElementSibling)
    }
    else {
      ev.target.parentElement.nextElementSibling.nextElementSibling.classList.remove('checked');
      updatelocalstoragetounchecked(ev.target.parentElement.nextElementSibling.nextElementSibling)

    }



  }

  function updatelocalstoragetounchecked(todo) {
    let tasks;
    //console.log(todo);
    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    let objectindex = tasks.findIndex((list => list.items == todo.textContent))
    //console.log(objectindex);

    //console.log(tasks);
    tasks.forEach(function(item) {

      if (todo.textContent === item.items) {
        tasks[objectindex] = {
          items: todo.textContent,
          checked: false
        }

      }
      localStorage.setItem('tasks', JSON.stringify(tasks));
      //console.log(tasks)

    });
  }

  function updatelocalstoragetochecked(todo) {
    let tasks;
    //console.log(todo);
    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    let objectindex = tasks.findIndex((list => list.items == todo.textContent))
    //console.log(objectindex);

    //console.log(tasks);
    tasks.forEach(function(item) {

      if (todo.textContent === item.items) {
        tasks[objectindex] = {
          items: todo.textContent,
          checked: 'checked'
        }

      }
      localStorage.setItem('tasks', JSON.stringify(tasks));
      //console.log(tasks)

    });
  }

  // var list = document.querySelector('ul');

  $("#add").click(() => {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
     let array;
         if (localStorage.getItem('tasks-two') === null) {
      array = [];
    } else {
      array = JSON.parse(localStorage.getItem('tasks-two'));
    }


    if ($("#add").is(':checked')) {
      
     if(array.includes(input_to_do.val())){
       alert('todo already in the list')
       input_to_do.val('')
       setTimeout(()=>{
                 $("#add").attr("checked", false)

       }, 500)
     }else{
                   if (input_to_do.val() !== '') {
                          storeTaskInLocalStorage(input_to_do.val());
                          

               setTimeout(()=>{
                 $("#add").attr("checked", false)

       }, 500)

        list.innerHTML += ` <div class="items ${colors}  "draggable="true" id="shows"><label class="container"> <input type="checkbox" id="adds" onclick="change(event)"   ${false}> <span class="checkmark"></span>
    </label><img src="./images/icon-cross.svg" alt="" class="drop"onclick="deletes(event);" ><li class=' ${false}'id="${input_to_do.val()}"     ontouchstart='touchStart(event)'ontouchmove='touchMove(event)'ontouchend='touchEnd(event)'data-index='${tasks.length}'>${input_to_do.val()}</li></div>`
        input_to_do.val('')
        //console.log(tasks.length++)
        $("#number").html(tasks.length+1)
        
            const mest = document.querySelector(".main-container");
    if (mest.classList.contains("light")) {
      localStorage.setItem('color', "light");
      //console.log("yes")
      localStorage.setItem('icon', "icon-x");
      localStorage.setItem('background', "background");
      $(".items,#shows,#clone-id").addClass("light");
    }
    else {
      //console.log('no')
      $(".items,#shows,#clone-id").removeClass("light");
      localStorage.setItem('color', "fif");
      localStorage.setItem('background', "backround");
      localStorage.setItem('icon', "iconss")

    }

      }
          else {
        alert('write something')
               setTimeout(()=>{
                 $("#add").attr("checked", false)

       }, 500)

      }

     }



      //console.log(colors)
      

    }
  })
  $(".clear").click(() => {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    let objectindex = tasks.filter((list => list.checked == 'checked'))
    objectindex.forEach((item) => {
      //console.log(item.items)
      tasks.forEach(function(list, index) {
        //console.log(item);
        if (item.items === list.items) {
          tasks.splice(index, 1);
        }

      });

    })
    localStorage.setItem('tasks', JSON.stringify(tasks));

    //console.log(tasks)

    location.reload()
  })


  function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
       tasks.push({
      items: task,
      checked: false
    })
     let array;
         if (localStorage.getItem('tasks-two') === null) {
      array = [];
    } else {
      array = JSON.parse(localStorage.getItem('tasks-two'));
    }
array.push(task)


  localStorage.setItem('tasks-two',JSON.stringify(array));
  
  
  
        localStorage.setItem('tasks', JSON.stringify(tasks));

  
  }
  $(".active,.actives").click(() => {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    let objectindex = tasks.filter((list => list.checked == false))
    //console.log(objectindex)
    list.innerHTML = ''
    objectindex.forEach(elem => {

      list.innerHTML += ` <div class="items ${colors}"draggable="true"><label class="container"> <input type="checkbox" id="adds" onclick="change(event)"   ${elem.checked}> <span class="checkmark"></span>
    </label><img src="./images/icon-cross.svg" alt="" class="drop"onclick="deletes(event);" ><li class=' ${elem.checked}'id="${elem.items}"    ontouchstart='touchStart(event)'ontouchmove='touchMove(event)'ontouchend='touchEnd(event)'>${elem.items}</li></div>`
    })

  })
  $(".completed,.completeds").click(() => {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    let objectindex = tasks.filter((list => list.checked == 'checked'))
    //console.log(objectindex)
    list.innerHTML = ''
    objectindex.forEach(elem => {

      list.innerHTML += ` <div class="items ${colors}"draggable="true"><label class="container"> <input type="checkbox" id="adds" onclick="change(event)"   ${elem.checked}> <span class="checkmark"></span>
    </label><img src="./images/icon-cross.svg" alt="" class="drop"onclick="deletes(event);" ><li class=' ${elem.checked}'id="${elem.items}"      ontouchstart='touchStart(event)'ontouchmove='touchMove(event)'ontouchend='touchEnd(event)'>${elem.items}</li></div>`
    })

  })
  $(".all,.alls").click(() => {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }


    list.innerHTML = ''
    tasks.forEach(elem => {

      list.innerHTML += ` <div class="items ${colors}"draggable="true" ><label class="container"> <input type="checkbox" id="adds" onclick="change(event)"   ${elem.checked}> <span class="checkmark"></span>
    </label><img src="./images/icon-cross.svg" alt="" class="drop"onclick="deletes(event);" ><li class=' ${elem.checked}'id="${elem.items}"       ontouchstart='touchStart(event)'ontouchmove='touchMove(event)'ontouchend='touchEnd(event)'>${elem.items}</li></div>`
    })

  })

  function getItem() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    //console.log(tasks.length)

    tasks.forEach(function(items, index) {
      // Create li element
      list.innerHTML += ` <div class="items ${colors}" draggable="true" ><label class="container"> <input type="checkbox" id="adds" onclick="change(event)"   ${items.checked}> <span class="checkmark"></span>
   </label> <img src="./images/icon-cross.svg" alt="" onclick="deletes(event);" class="drop"><li class=' ${items.checked}' id="${items.items}" data-index="${index}"      ontouchstart='touchStart(event)'ontouchmove='touchMove(event)'ontouchend='touchEnd(event)'>${items.items}</li></div>`

      $("#number").html(tasks.length)
listItems.push(list)
      // Append li to ul

    });
    console.log(listItems)
    addEventListeners();
  }
  $("#icons").click((ev) => {
    $(ev.target).toggleClass('icon-x')
    $(".items").toggleClass('light')
    $(".input-box,#to-Do,.footer,.main-container").toggleClass("light")
    $(".back").toggleClass("background")
    //console.log()

    storecolortolocalstorage()
  })

  function deletes(ev) {
    ev.target.parentElement.style.display = "none";
    // //console.log(ev.target.parentElement.nextElementSibling.nextElementSibling)
    // //console.log(ev.target.nextElementSibling)
    deletefromlocal(ev.target.nextElementSibling)
  }

  function deletefromlocal(items) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    let array;
         if (localStorage.getItem('tasks-two') === null) {
      array = [];
    } else {
      array = JSON.parse(localStorage.getItem('tasks-two'));
    }

    tasks.forEach((item, index) => {

      if (items.id === item.items) {
        tasks.splice(index, 1);
      }

    });
        array.forEach((item, index) => {

      if (items.id === item) {
        array.splice(index, 1);
      }

    });
    

    $("#number").html(tasks.length)
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('tasks-two', JSON.stringify(array));

  }

  function addEventListeners() {
    const draggables = document.querySelectorAll('.items');
    const dragListItems = document.querySelectorAll('.draggable-list li');

    draggables.forEach(draggable => {
      draggable.addEventListener('dragstart', dragStart);
    });

    dragListItems.forEach(item => {
      item.addEventListener('dragover', dragOver);
      item.addEventListener('dragdrop', dragDrop);
      item.addEventListener('dragenter', dragEnter);
      item.addEventListener('dragleave', dragLeave);
      
      item.setAttribute('ontouchstart', 'touchStart(event)')
      item.setAttribute('ontouchmove', 'touchMove(event)')
      item.setAttribute('ontouchend', 'touchEnd(event)')
      item.setAttribute('ontouchcancel', 'touchCancel()')
      item.setAttribute('ontouchleave', 'touchLeave()')


       console.log(item)

    });
  } 
  addEventListeners();

  function dragStart(ev) {
    console.log('Event: ', 'dragstart');
    dragStartIndex = ev.target.firstElementChild.nextElementSibling.getAttribute('data-index');
    console.log(dragStartIndex)
  }

  function dragEnter() {
    console.log('Event: ', 'dragenter');
    // this.classList.add('over');
  }

  function dragLeave() {
    console.log('Event: ', 'dragleave');
    this.classList.remove('over');
  }

  function dragOver(e) {
    console.log('Event: ', 'dragover');
    e.preventDefault();
  }

  function dragDrop(e) {
    this.classList.remove('over');

    console.log('Event: ', 'drop');
    const dragEndIndex = +e.target.getAttribute('data-index');
    console.log(dragEndIndex)
    swapItems(dragStartIndex, dragEndIndex);
alert('dropped')
    this.classList.remove('over');
  }
  swapItems(0, 1);
  // Swap list items that are drag and drop
  function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.items');
    const itemTwo = listItems[toIndex].querySelector('.items');
console.log(itemOne)
    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
  }

  function storecolortolocalstorage() {


    const container = document.querySelector(".main-container");
    if (container.classList.contains("light")) {
      localStorage.setItem('color', "light");
      //console.log("yes")
      localStorage.setItem('icon', "icon-x");
      localStorage.setItem('background', "background");
      $(".items,#shows").addClass("light");
      colors = 'light'
    }                 
    else {
      //console.log('no')
      $(".items,#shows").removeClass("light");
      colors = 'fif'
      localStorage.setItem('color', "fif");
      localStorage.setItem('background', "backround");
      localStorage.setItem('icon', "iconss")

    }
  
    //console.log(localStorage.getItem("color"))

  }
  //console.log(localStorage.getItem("color"))
  var itemId = '';
  var dropZoneId = '';

  function touchStart(e) {
    itemId = e.target;

    let clone = document.createElement('div');
    clone.classList.add('items');
    let cloneLi = document.createElement('li');
    cloneLi.classList.add('item')
    clone.setAttribute('id', 'clone-id');
    cloneLi.textContent = itemId.textContent


    clone.appendChild(cloneLi)

    let left = e.touches[0].pageX;
    let top = e.touches[0].pageY;

    clone.style.position = 'absolute'
    clone.style.left = left + 'px';
    clone.style.top = top + 'px';
    clone.style.opacity = 0.5;
    clone.setAttribute('style', 'width:150px;z-index: 100;')

    itemId.appendChild(clone)

  }

  function touchMove(e) {
    let clone = document.getElementById('clone-id');
    let left = e.touches[0].pageX;
    let top = e.touches[0].pageY;

    clone.style.position = 'absolute'
    clone.style.left = left + 'px';
    clone.style.top = top + 'px';
    clone.style.opacity = 0.5;
    let touchX = e.touches[0].pageX
    let touchY = e.touches[0].pageY
    touchEnter(e, touchX, touchY)

  }


  function touchEnter(e, touchX, touchY) {
    let items = document.querySelectorAll('.draggable-list li');

    items.forEach(item => {
      var rect = item.getBoundingClientRect();
      ////console.log(rect)
      var overlap = !(rect.right < touchX ||
        rect.left > touchX ||
        rect.bottom < touchY ||
        rect.top > touchY)
      if (overlap) {
        item.parentElement.style.borderBottom = "1px dotted white";

        dropZoneId = item.parentElement
      } else {
        item.parentElement.style.borderBottom = "  1px solid  hsl(233, 14%, 35%)";
      }
      // //console.log(item.parentElement)

    })
  }
  function touchEnd(e) {
    let clone = document.getElementById('clone-id');
    clone.remove()
      let originDropzone = itemId.parentElement

    dropZoneId.style.borderBottom = "1px solid hsl(233, 14%, 35%)";
    //if outside any dropzone, just do nothing
    if (dropZoneId == '') {
      dropZoneId = ''
      imgId = ''
    } else {
       let origindata =    originDropzone.firstElementChild.nextElementSibling.nextElementSibling;
  
let dropdata = dropZoneId.firstElementChild.nextElementSibling.nextElementSibling;
    let tasks;
    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
      // if inside dropzone, swap the image 
      let toSwap = dropZoneId.firstElementChild.nextElementSibling.nextElementSibling
      if (originDropzone.firstElementChild.nextElementSibling.nextElementSibling.classList.contains('checked')) {
        dropZoneId.firstElementChild.children[0].setAttribute('checked', true)
        originDropzone.firstElementChild.children[0].removeAttribute('checked', true)

       tasks[dropdata.getAttribute('data-index')]={
      items: origindata.textContent,
      checked: 'checked'
    }
            tasks[origindata.getAttribute('data-index')]={
      items: dropdata.textContent,
      checked: false
    }

  
        localStorage.setItem('tasks', JSON.stringify(tasks));




      }
      if (!originDropzone.firstElementChild.nextElementSibling.nextElementSibling.classList.contains('checked')) {
        dropZoneId.firstElementChild.children[0].removeAttribute('checked', true)
        originDropzone.firstElementChild.children[0].setAttribute('checked', true)
               tasks[dropdata.getAttribute('data-index')]={
      items: origindata.textContent,
      checked: false
    }
            tasks[origindata.getAttribute('data-index')]={
      items: dropdata.textContent,
      checked: 'checked'
    }

  
        localStorage.setItem('tasks', JSON.stringify(tasks));

      }

      if (originDropzone.firstElementChild.nextElementSibling.nextElementSibling.classList.contains('checked') && dropZoneId.firstElementChild.nextElementSibling.nextElementSibling.classList.contains('checked')) {
        dropZoneId.firstElementChild.children[0].setAttribute('checked', true)
        originDropzone.firstElementChild.children[0].setAttribute('checked', true)
       tasks[dropdata.getAttribute('data-index')]={
      items: origindata.textContent,
      checked: 'checked'
    }
            tasks[origindata.getAttribute('data-index')]={
      items: dropdata.textContent,
      checked: 'checked'
    }

  
        localStorage.setItem('tasks', JSON.stringify(tasks));

      }
      if (!originDropzone.firstElementChild.nextElementSibling.nextElementSibling.classList.contains('checked') && !dropZoneId.firstElementChild.nextElementSibling.nextElementSibling.classList.contains('checked')) {
        dropZoneId.firstElementChild.children[0].removeAttribute('checked', true)
        originDropzone.firstElementChild.children[0].removeAttribute('checked', true)
       tasks[dropdata.getAttribute('data-index')]={
      items: origindata.textContent,
      checked: false
    }
            tasks[origindata.getAttribute('data-index')]={
      items: dropdata.textContent,
      checked: false
    }

  
        localStorage.setItem('tasks', JSON.stringify(tasks));

      }


//console.log(origindata)
//console.log(dropdata)
      originDropzone.appendChild(toSwap)
      dropZoneId.appendChild(itemId)
    // console.log(originDropzone.firstElementChild.nextElementSibling.nextElementSibling)
   //   console.log(dropZoneId)
      dropZoneId = ''
      imgId = ''
    }

   }
 /* $('.sort').click(() => {
        let tasks;
        if (localStorage.getItem('tasks') === null) {
          tasks = [];
        } else {
          tasks = JSON.parse(localStorage.getItem('tasks'));
          tasks.sort((a,b)=>{
            return a-b
          })
              localStorage.setItem('tasks', JSON.stringify(tasks));
              
              

        }
  })*/
  
