/**********************************************/
/*  English Language default
/**********************************************/
(function enDefLang() {
    let esOpt = document.getElementsByClassName('es-opt')
    for (let i = 0; i < esOpt.length; i++) {
      esOpt[i].style.display = 'none'
    }
  }())
  
  /**********************************************/
  /*  Loader
  /**********************************************/
  let section = document.getElementsByTagName("section")
  let loader_ctn = document.getElementById("loader_ctn")
  
  for(let i=0; i<section.length; i++) {
    section[i].style.display = 'none'
  }
  window.addEventListener("load", () => {
    for(let i=0; i<section.length; i++) {
      section[i].style.display = 'flex'
    }
    loader_ctn.style.display = 'none'
  })
  
  /**********************************************/
  /*  Select Language
  /**********************************************/
  function selectLan(el) {
    let lang = el.selectedIndex
    let esOpt = document.getElementsByClassName('es-opt')
    let enOpt = document.getElementsByClassName('en-opt')
  
    // english
    if (lang === 0) {
      for (let i = 0; i < esOpt.length; i++) {
        esOpt[i].style.display = 'none'
        enOpt[i].style.display = 'block'
      }
      console.log('Hello!')
    // spanish
    } else {
      for (let i = 0; i < enOpt.length; i++) {
        enOpt[i].style.display = 'none'
        esOpt[i].style.display = 'block'
      }
      console.log('Hola!')
    }
  }
  
  /**********************************************/
  /*  Main Hero 
  /**********************************************/
  function toContact() {
    let heroContact = document.getElementsByClassName('hero-contact')
    let heroContact_0 = heroContact[0]
  
    let contactEl = document.documentElement.offsetHeight - heroContact_0.offsetHeight
  
    window.scroll({
      top: contactEl,
      left: 0,
      behavior: 'smooth'
    })
  }
  
  /**********************************************/
  /*  Footer Year
  /**********************************************/
  let anhio = new Date()
  let curr_year =  document.getElementById("current_year")
  curr_year.innerText = anhio.getFullYear() 
  /**********************************************/
  
  /**********************************************/
  /*  Function on Scroll of About Section
  /**********************************************/
  function onScroll() {
    let heroContact = document.getElementsByClassName('hero-contact')
    let heroContact_0 = heroContact[0]
    
    let docElScroll = document.documentElement.scrollTop
  
    if (docElScroll + 1 >= document.documentElement.offsetHeight - heroContact_0.offsetHeight) {
      heroContact_0.style.zIndex = '0'
      console.log('Do you want to get in touch? 🖤')
    } else {
      heroContact_0.style.zIndex = '-1'
    }
  }
  
  /* Show Read More */
  function openReadMore(id) {
    let readMoreTXT = document.getElementById(id)
    let readMoreSection = document.getElementById(id + '-section')
    console.log("You're curious 👀")
    readMoreTXT.style.display = 'none'
    readMoreSection.style.display = 'block'
  }
  
  /**********************************************/
  /*  Skills Progrees
  /**********************************************/
  function seeMoreSkills() {
    let moreSkills = document.getElementsByClassName('more-skills')
    let moreSkills_0 = moreSkills[0]
    let moreSkillsBtn = document.getElementsByClassName('skills-more-btn')
    let moreSkillsBtn_0 = moreSkillsBtn[0]
  
    moreSkills_0.classList.replace('d-none', 'd-block')
    moreSkillsBtn_0.style.display = 'none'
    console.log('There are the technologies that I saw 🐶')
  }
  
  /**********************************************/
  /*  Work Projects
  /**********************************************/
  function showProject(project) {
    /* Descriptions and Titles */
    let title = project.dataset.title
    let image = project.children[0].src
    let link = project.dataset.link
    let desc = project.dataset.desc
    let tools = project.dataset.tools.split(',')
  
    let toolsSize = tools.length
  
    /* Components of pop up Project */
    let popup = document.getElementById('project-popup')
    let projectTitle = document.getElementById('project-name')
    let projectImage = document.getElementById('project-img')
    let projectLink = document.getElementById('project-link')
    let projectDesc = document.getElementById('project-desc')
    let projectList = document.getElementById('project-list')
    
    /* Metiendo los datos de data-* en el pop up */
    projectTitle.textContent = title
    projectImage.src = image
    projectLink.href = link
    projectDesc.textContent = desc
  
    /* Iterando sobre un array, mientras esto pasa también se crea una lista */
    for (let i = 0; i < toolsSize; i++) {  
      let li = document.createElement('li')
      projectList.appendChild(li)
      li.textContent = tools[i]
      li.setAttribute('id', 'project-tool')
    }
    popup.style.display = 'flex'
    popup.classList.replace('d-none', 'popup')
  }
  
  function closeProject() {
    let popup = document.getElementById('project-popup')
    let projectList = document.getElementById('project-list')
  
    let projectListSize = projectList.childElementCount
  
    for (let i = 0; i < projectListSize; i++) {  
      projectList.removeChild(projectList.children[0])
    }
    popup.style.display = 'none'
  }
  
  function seeMoreProjects() {
    let moreProjects = document.getElementsByClassName('container more-projects')
    let moreProjects_0 = moreProjects[0]
    let moreProjectsBtn = document.getElementsByClassName('projects-more-btn')
    let moreProjectsBtn_0 = moreProjectsBtn[0]
  
    moreProjects_0.style.display = 'block'
    moreProjectsBtn_0.style.display = 'none'
    console.log('There are the projects that I\'ve done 🐶')
  }

  /**********************************************/
/*  Dashboards
/**********************************************/
function showDashboard(dashboard) {
  /* Descriptions and Titles */
  let title = dashboard.dataset.title;
  let image = dashboard.children[0].src;
  let link = dashboard.dataset.link;
  let desc = dashboard.dataset.desc;
  let tools = dashboard.dataset.tools.split(',');

  let toolsSize = tools.length;

  /* Components of pop up Dashboard */
  let popup = document.getElementById('dashboard-popup');
  let dashboardTitle = document.getElementById('dashboard-name');
  let dashboardImage = document.getElementById('dashboard-img');
  let dashboardLink = document.getElementById('dashboard-link');
  let dashboardDesc = document.getElementById('dashboard-desc');
  let dashboardList = document.getElementById('dashboard-list');

  /* Adding data-* attributes to the pop-up */
  dashboardTitle.textContent = title;
  dashboardImage.src = image;
  dashboardLink.href = link;
  dashboardDesc.textContent = desc;

  /* Iterating over the tools array and creating a list */
  for (let i = 0; i < toolsSize; i++) {
    let li = document.createElement('li');
    dashboardList.appendChild(li);
    li.textContent = tools[i];
    li.setAttribute('id', 'dashboard-tool');
  }
  popup.style.display = 'flex';
  popup.classList.replace('d-none', 'popup');
}

function closeDashboard() {
  let popup = document.getElementById('dashboard-popup');
  let dashboardList = document.getElementById('dashboard-list');

  let dashboardListSize = dashboardList.childElementCount;

  for (let i = 0; i < dashboardListSize; i++) {
    dashboardList.removeChild(dashboardList.children[0]);
  }
  popup.style.display = 'none';
}

function seeMoreDashboards() {
  let moreDashboards = document.getElementsByClassName('container more-dashboards');
  let moreDashboards_0 = moreDashboards[0];
  let moreDashboardsBtn = document.getElementsByClassName('dashboards-more-btn');
  let moreDashboardsBtn_0 = moreDashboardsBtn[0];

  moreDashboards_0.style.display = 'block';
  moreDashboardsBtn_0.style.display = 'none';
  console.log('Here are more dashboards I\'ve created 🐶');
}

  /**********************************************/
  /*  Certificates
  /**********************************************/
  function showCertificate(certificate) {
    /* Descriptions and Titles */
    let title = certificate.dataset.title
    let image = certificate.children[0].src
    let link = certificate.dataset.link
    let desc = certificate.dataset.desc.split('|').map(item => item.trim())
    let tools = certificate.dataset.tools.split(',')
  
    let toolsSize = tools.length
  
    /* Components of pop up Certificate */
    let popup = document.getElementById('certificate-popup')
    let certificateTitle = document.getElementById('certificate-name')
    let certificateImage = document.getElementById('certificate-img')
    let certificateLink = document.getElementById('certificate-link')
    let certificateDesc = document.getElementById('certificate-desc')
    let certificateList = document.getElementById('certificate-list')
    
    /* Metiendo los datos de data-* en el pop up */
    certificateTitle.textContent = title
    certificateImage.src = image
    certificateLink.href = link
    
    /* Limpiando el contenido anterior */
    certificateDesc.innerHTML = ''
    certificateList.innerHTML = ''
    
    /* Agregando cada sección de la descripción */
    desc.forEach(section => {
      let p = document.createElement('p')
      p.innerHTML = section // Usa innerHTML en lugar de textContent
      certificateDesc.appendChild(p)
  })
  
    /* Iterando sobre un array, mientras esto pasa también se crea una lista */
    for (let i = 0; i < toolsSize; i++) {  
      let li = document.createElement('li')
      certificateList.appendChild(li)
      li.textContent = tools[i]
      li.setAttribute('id', 'certificate-tool')
    }
    popup.style.display = 'flex'
    popup.classList.replace('d-none', 'popup')
}
  
  function closeCertificate() {
    let popup = document.getElementById('certificate-popup')
    let certificateList = document.getElementById('certificate-list')
  
    let certificateListSize = certificateList.childElementCount
  
    for (let i = 0; i < certificateListSize; i++) {  
      certificateList.removeChild(certificateList.children[0])
    }
    popup.style.display = 'none'
  }
  
  /**********************************************/
  /*  Set a Functions when window scrolls
  /**********************************************/
  document.addEventListener("scroll", function() {
    onScroll()
  })