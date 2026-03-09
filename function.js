
console.log('boooooooooooom')
//color toggle
const listbtn = document.getElementById('btn').querySelectorAll('button')

function color(x) {
    listbtn.forEach(x => {
        x.classList.remove('active')
    })
    document.getElementById(x).classList.add('active')
}


//API 1 --> show all issues
const issuecount = document.getElementById('issueCount')
const contentP = document.getElementById('content')
const popup = document.getElementById('my_modal_5')
const search = document.getElementById('search')

let arraydata = []


fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
.then(res => res.json())
.then( data => {
    arraydata = data.data
    content(arraydata)})

//modal
function modal(x) {
    popup.innerHTML = ''
    popup.innerHTML = `
        <div class="modal-box">
            <div>
                <h1 class="font-bold">${x.title}</h1>
                <div class="flex gap-6">
                    <div class="bg-green-500 text-white rounded-xl px-2">${x.status}</div>

                    <ul class="flex gap-7 list-disc" type="dot">
                        <li>Opened by ${x.assignee}</li>
                        <li>${x.createdAt}</li>
                    </ul>

                </div>
                <div class="px-3 flex gap-2 bug">

                </div>
                <p class="my-3">${x.description}</p>
                <div class="flex p-3 gap-10 bg-base-200">
                    <div>
                        <p>Assignee:</p>
                        <p class="font-bold">${x.assignee}</p>
                    </div>
                    <div>
                        <p>Priority:</p>
                        <div class="rounded-full px-2 ${x.priority === "high" ? 'red' : x.priority ==='medium' ? 'yellow' : 'gray'}">${x.priority}</div>
                    </div>
                </div>
            </div>
            <div class="modal-action">
                <form method="dialog">
                    <button class="btn btn-primary">Close</button>
                </form>
            </div>
        </div>
        
        
        `
      const bug = popup.querySelector('.bug')

        x.labels.forEach((p,index) => {
            const minibug = document.createElement('div')
            if(x.labels.length>1 && index == 1){
                minibug.innerHTML = `
                 <div class="yellow rounded-full p-1 flex justify-center items-center gap-2"><img src="./assets/Lifebuoy.png" alt="">${p}</div>
                `
                bug.appendChild(minibug)
            }
            else{
            minibug.innerHTML = `
            <div class="red rounded-full p-1"><i class="fa-solid fa-bug"></i>${p}</div>
            `
            bug.appendChild(minibug)
            }
        })



    my_modal_5.showModal()


}
//main content
function content(x) {
    x.forEach(i => {

        const childcontent = document.createElement('div')
        childcontent.innerHTML = `
        <div  class="rounded-xl  space-y-1.5 shadow w-full color h-full">
            <div class="flex justify-between items-center p-3">
                <img src=${i.status === 'open' ? './assets/Open-Status.png' : '"./assets/Closed- Status .png"'} alt="">
                <div class="rounded-full px-2 prior">${i.priority}</div>
            </div>
            <div class="px-3">
                <h1 class="font-bold">${i.title}</h1>
                <p>${i.description}</p>
            </div>
            <div class="px-3 flex gap-2 bug">
               
            </div>
            <hr class="border-t-black/15">
            <div class="px-3">
                <p>#1 by ${i.author}</p>
                <p>${i.createdAt.split("T")[0]}</p>
            </div>
        </div>
    
    `
        childcontent.addEventListener('click', () => modal(i))
        //open btn

       




        //custom priority color --> high,midum,low
        const prior = childcontent.querySelector('.prior')
        if (i.priority.toUpperCase() === 'HIGH') {
            prior.classList.add('red')
        }
        else if (i.priority.toUpperCase() === 'MEDIUM') {
            prior.classList.add('yellow')
        }
        else {
            prior.classList.add('gray')
        }
        //custom border color
        const card = childcontent.querySelector('.color')
        if (i.status === "open") {
            card.classList.add('b_green')
        }
        else {
            card.classList.remove('b_green')
            card.classList.add('b_purple')
        }

        const bug = childcontent.querySelector('.bug')

        i.labels.forEach((p,index) => {
            const minibug = document.createElement('div')
            if(i.labels.length>1 && index == 1){
                minibug.innerHTML = `
                 <div class="yellow rounded-full p-1 flex justify-center items-center gap-2"><img src="./assets/Lifebuoy.png" alt="">${p}</div>
                `
                bug.appendChild(minibug)
            }
            else{
            minibug.innerHTML = `
            <div class="red rounded-full p-1"><i class="fa-solid fa-bug"></i>${p}</div>
            `
            bug.appendChild(minibug)
            }
        })


        contentP.appendChild(childcontent)
    })
  
}
//search
search.addEventListener('keyup',  () => {
  const word = search.value.toLowerCase()
  const match =arraydata.filter( i => i.title.toLowerCase().includes(word))
  contentP.innerHTML = ''
  content(match)
   
})
search.addEventListener('blur', () => {
    search.value = ''
})

//btn show

document.getElementById('Open').addEventListener('click',() =>{
     contentP.innerHTML = ''
     const open = arraydata.filter( i => i.status === 'open')
     content(open)
     issuecount.innerText = open.length

})
document.getElementById('Closed').addEventListener('click',() =>{
     contentP.innerHTML = ''
     const close = arraydata.filter( i => i.status === 'closed')
     content(close)
     issuecount.innerText = close.length

})
document.getElementById('All').addEventListener('click',() => {
    contentP.innerHTML = ''
    content(arraydata)
    issuecount.innerText = arraydata.length
})



