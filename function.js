
console.log('boooooooooooom')
//color toggle
const listbtn = document.getElementById('btn').querySelectorAll('button')

function color(x){
listbtn.forEach( x => {
    x.classList.remove('active')
})
document.getElementById(x).classList.add('active')
}
//btn function 

//API 1 --> show all issues
const issuecount = document.getElementById('issueCount')
const contentP = document.getElementById('content')


fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
.then(res => res.json())
.then(data => content(data.data))

function content(x){
    x.forEach( i => {
        

    const childcontent = document.createElement('div')
    childcontent.innerHTML = `
        <div  class="rounded-xl  space-y-1.5 shadow w-full color">
            <div class="flex justify-between items-center p-3">
                <img src=${ i.status === 'open' ? './assets/Open-Status.png' : '"./assets/Closed- Status .png"'} alt="">
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
    //custom priority color --> high,midum,low
    const prior = childcontent.querySelector('.prior')
    if(i.priority.toUpperCase() === 'HIGH'){
        prior.classList.add('red')
    }
    else if ( i.priority.toUpperCase() === 'MEDIUM'){
        prior.classList.add('yellow')
    }
    else{
        prior.classList.add('gray')
    }
    //custom border color
     const card = childcontent.querySelector('.color')
     if(i.status === "open"){
        card.classList.add('b_green') 
     }
     else{
        card.classList.remove('b_green')
        card.classList.add('b_purple')
     }

        const bug=childcontent.querySelector('.bug')
       
        i.labels.forEach((p) => {
            const minibug = document.createElement('div')

            minibug.innerHTML=`
            <div class="red rounded-full p-1"><i class="fa-solid fa-bug"></i>${p}</div>
            `
            bug.appendChild(minibug)
        })
    
  
    contentP.appendChild(childcontent)
    })
}



