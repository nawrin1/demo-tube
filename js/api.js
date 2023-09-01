const loading= async() =>{
    const res= await fetch("https://openapi.programming-hero.com/api/videos/categories")
    const data= await res.json()
    console.log(data.data)
    show_tab(data.data)
} 
const show_tab = tab_name =>{
    const tabs= document.getElementById("tabs")
    tab_name.forEach(elem => {
        const div = document.createElement("div")
        div.classList=`bg-[#d3d1d1] px-4 py-3 rounded-[4px]  text-black w-auto`
        
        div.innerHTML=`
        <button class="text-[rgba(37, 37, 37, 0.70)] font-normal" onclick="show_details(${elem.category_id})"><a>${elem.category}</a></button>
        `
        tabs.appendChild(div)

    })


}
const show_details=async (details)=>{
    console.log(details)
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${details}`)
    const id_data=await res.json()
    // show_data(id_data.data)
    if(id_data.data.length>0){
        show_data(id_data.data)
    }
    else{
        documents()
    }
    const sortby =document.getElementById("sortby")
    
    sortby.addEventListener("click",function(){
        view(id_data.data)
    })

    
    // show_data(id_data.data.length>0 ? id_data.data : documents())

    

}
const blogs =()=>{
    
    window.location.href="blog.html";
}
const view=(id_data)=>{

    const main_container= document.getElementById("main_container")
    
    // console.log(id_data,">>>>")
    main_container.innerHTML="";


    id_data.sort((a,b)=> parseFloat(b.others.views)-parseFloat(a.others.views));
    id_data?.forEach(element => {
        console.log(element,"?")
        const div=document.createElement("div")
        div.classList=`card w-[280px] bg-base-100 rounded-[8px] shadow-xl `
        div.innerHTML=`
        <figure class="relative">
            <img class=" w-[280px] h-[200px] rounded-[4px]" src="${element.thumbnail}" alt="Shoes" />
            <div  class="absolute top-[90%] left-[62%] w-[100px] h-[15px] rounded-[4px] ">
                <p  class=" text-white bg-black text-xs">  ${element.others.posted_date ? `${Math.floor(element.others.posted_date / 3600)} hrs ${Math.floor((element.others.posted_date % 3600) / 60)} min ago`: ''}</p>
            </div>
        </figure>
        <div class="pb-[5px]">
            <div class="flex gap-5 pt-[20px]">
                <img class="w-[40px] h-[40px] rounded-full" src="${element.authors[0].profile_picture}"  />
                <p class="font-bold text-[16px]" >${element.title}</p>
            
            </div>
            <div class="flex justify-start ml-[60px]">
                <p class="text-[14px]">${element.authors[0].profile_name}</p>
                <div class=" w-[20px] h-[20px]">${element.authors[0].verified? "<img src='verified.png'>" : ""}</div>
                
                
            </div>
            <div class=" mt-[10px] ml-[60px]">
                <p class="text-[14px]">${element.others.views} views</p>
            </div>

        </div>
        `
        main_container.appendChild(div)

    })
    
    // array.forEach(elem=>{
    //     console.log(elem)
    // })
    


}


const show_data = (id_data)=>{ 
    const main_container= document.getElementById("main_container")

    
    console.log(id_data,">>>>")
    main_container.innerHTML="";
    const section1= document.getElementById("main_section")
    section1.classList.add("hidden")
    const section2= document.getElementById("main_section1")
    section2.classList.remove("hidden")
    
    id_data?.forEach(element => {
        const div=document.createElement("div")
        div.classList=`card  w-[280px] bg-base-100 rounded-[8px] shadow-xl`
        div.innerHTML=`
        <figure class="relative">
            <img class=" w-[280px] h-[200px] rounded-[4px]" src="${element.thumbnail}" alt="Shoes" />
            <div  class="absolute top-[90%] left-[62%] w-[100px] h-[15px] rounded-[4px] ">
                <p  class=" text-white bg-black text-xs ">  ${element.others.posted_date ? `${Math.floor(element.others.posted_date / 3600)} hrs ${Math.floor((element.others.posted_date % 3600) / 60)} min ago`: ''}</p>
            </div>
        </figure>
        <div class="pb-[5px]">
            <div class="flex gap-5 pt-[20px]">
                <img class="w-[40px] h-[40px] rounded-full" src="${element.authors[0].profile_picture}"  />
                <p class="text-[16px] font-bold">${element.title}</p>
            
            </div>
            <div class="flex justify-start ml-[60px]">
                <p class="text-[14px]">${element.authors[0].profile_name}</p>
                <div class=" w-[20px] h-[20px]">${element.authors[0].verified? "<img src='verified.png'>" : ""}</div>
                
                
            </div>
            <div class=" mt-[10px] ml-[60px]">
                <p class="text-[14px]">${element.others.views} views</p>
            </div>

        </div>
        `
        main_container.appendChild(div)


    })
    


}

const documents = ()=> {
    const section1= document.getElementById("main_section")
    section1.classList.remove("hidden")
    const section2= document.getElementById("main_section1")
    section2.classList.add("hidden")

    const main_container2= document.getElementById("main_container2")
    main_container2.innerHTML="";
    // main_container.classList=`grid grid-cols-1 my-auto h-[100vh]`
    const div= document.createElement("div")
    div.innerHTML=`
    <div class="w-[400px] mx-auto pl-auto text-center mt-[120px] mb-[200px]">

        <img class="mx-auto" src="Icon.png" alt="" />
        <p class="text-4xl font-[700px] " >Oops!! Sorry, There is no <br> content here</p>
    </div>
    
    `
    main_container2.appendChild(div)



    
}

loading();
show_details("1000")