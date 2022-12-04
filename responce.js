function saveToLocalStorage(event) {
  event.preventDefault();
  const ammount = event.target.ammount.value;
  const Description = event.target.Description.value;
  const Type = event.target.Type.value;
  const obj = {
    ammount,
    Description,
    Type,
  };
  axios
    .post(
      "https://crudcrud.com/api/e742dc88cf654daebb5ec53f5e5948d7/appoinmentData",
      obj
    )
    .then((response) => {
      showNewUserOnScreen(response.data);
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
}

function showNewUserOnScreen(user) {
    document.getElementById("ammount").value = "";
    document.getElementById("Description").value = "";
    document.getElementById("Type").value = "";
  
    const parentNode = document.getElementById("users");
    const childHTML = `<li id='${user._id}'>'${user.ammount}' - '${user.Description}'-'${user.Type} <button onclick=editUserDetails('${user.ammount}','${user.Description}','${user.Type}','${user._id}')>Edit</button><button onclick=deleteUser('${user._id}')>Delete</button></li>`;
    parentNode.innerHTML = parentNode.innerHTML + childHTML;
  }

window.addEventListener("DOMContentLoaded", () => {
    axios
      .get(
        "https://crudcrud.com/api/e742dc88cf654daebb5ec53f5e5948d7/appoinmentData"
      )
      .then((response) => {
        console.log(response);
        for (var i = 0; i < response.data.length; i++) {
          showNewUserOnScreen(response.data[i]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
  
  function deleteUser(userId) {
    axios
      .delete(
        `https://crudcrud.com/api/e742dc88cf654daebb5ec53f5e5948d7/appoinmentData/${userId}`
      )
      .then((response) => {
        removeUserFromScreen(userId);
      })
      .catch((error) => {
        console.log(error);
      });
  }


function editUserDetails(ammount,Description,Type,userId) {
  document.getElementById("ammount").value = ammount;
  document.getElementById("Description").value = Description;
  document.getElementById("Type").value = Type;
  deleteUser(userId);
}

function removeUserFromScreen(userId) {
  const parentNode = document.getElementById("users");
  const childNodeToBeDeleted = document.getElementById(userId);
  if (childNodeToBeDeleted) {
    parentNode.removeChild(childNodeToBeDeleted);
  }
}
