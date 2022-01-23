
window.onload = function () {
  let btnAddFolder = document.querySelector("#btnAddFolder");
  let divContainer = document.querySelector("#divContainer");
  let pageTemplates = document.querySelector("#pageTemplates");
  let folders = [];
  let fid = -1;

  // btnAddFolder.addEventListener("click", addFolder);
  btnAddFolder.addEventListener("click", addFolder);

  function addFolder() {
    let fname = prompt("please enter folder's name 😊");
    if (fname) {
      let exists = folders.some(function (folders) {
        if (folders.name == fname) {
          return true;
        }
        return false;
      });
      if (exists == false) {
        fid++;
        folders.push({
          name: fname,
          id: fid,
        });
        addFolderToHTML(fname, fid);
        saveToStorage();
      }
    }
  }
  function editFolder() {
    let divFolder = this.parentNode;
    let divName = divFolder.querySelector("[purpose = 'name']");
    let ofname = divName.innerHTML;
    let nfname = prompt("Enter new name for " + ofname);
    if (nfname) {
      if (nfname != ofname) {
        let exists = folders.some((f) => f.name == ofname);
        if (exists) {
          // here changes happens only in ram.
          let folder = folders.find((f) => f.name == ofname);
          folder.name = nfname;

          // here changes happen in HTML
          divName.innerHTML = nfname;

          //storage
          saveToStorage();
        }
      } else {
        alert("This is the old name of folder. Please enter new name");
      }
    } else {
      alert("please enter a name");
    }
  }
  function deleteFolder() {
    let divFolder = this.parentNode;
    let divName = divFolder.querySelector("[purpose ='name']");
    let flag = confirm(
      "Are you sure you want to delete " + divName.innerHTML + "?"
    );
    if (flag) {
      //in ram
      let fidx = folders.findIndex((f) => f.name == divName.innerHTML);
      folders.splice(fidx, 1);
      //html
      divContainer.removeChild(divFolder);

      saveToStorage();
    }
  }
  function addFolderToHTML(fname, fid) {
    let divFolderTemplate = pageTemplates.content.querySelector(".folder");
    let divFolder = document.importNode(divFolderTemplate, true);
    divFolder.setAttribute("fid", fid);
    let spanEdit = divFolder.querySelector("[action='edit']");
    let spanDelete = divFolder.querySelector("[action='delete']");
    let divName = divFolder.querySelector("[purpose ='name']");

    divName.innerHTML = fname;
    spanEdit.addEventListener("click", editFolder);
    spanDelete.addEventListener("click", deleteFolder);

    divContainer.appendChild(divFolder);
  }
  function saveToStorage() {
    let fjson = JSON.stringify(folders);
    localStorage.setItem("data", fjson);
  }
  function loadFromStorage() {
    let fjson = localStorage.getItem("data");
    if (fjson) {
      folders = JSON.parse(fjson);
      folders.forEach((f) => {
        if (f.id > fid) {
          fid = f.id;
        }
        addFolderToHTML(f.name, f.id);
      });
    }
  }
  loadFromStorage();
  console.log("hello");
};
