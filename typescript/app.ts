
function redirectToProListPage() {
  window.location.href = 'list_pro.html';
}

//fetch ra trang chủ
function fetchIndex() {
  const foodUrl = `http://localhost:3000/food?_limit=8`;
  fetch(foodUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Không thể kết nối mạng');
      }
      return response.json();
    })
    .then((data) => {
      let foodT = ``;
      for (const food of data) {
        foodT += `
          <div class="col-lg-6">
            <div class="d-flex align-items-center">
              <img class="flex-shrink-0 img-fluid rounded" src="${food.image}" alt="" style="width: 80px;">
              <div class="w-100 d-flex flex-column text-start ps-4">
                <h5 class="d-flex justify-content-between border-bottom pb-2">
                  <span>${food.name}</span>
                  <span class="text-primary">${food.price}</span>
                </h5>
              </div>
            </div>
          </div>
        `;
      }
      document.getElementById('food')!.innerHTML = foodT;
      console.log(data);
    })
    .catch((error) => {
      console.error('Lỗi khi tải dữ liệu:', error);
    });
}

//fetch ra trang admin
function fetchAllProducts() {
  const foodUrl = `http://localhost:3000/food`;
  fetch(foodUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Không thể kết nối mạng');
      }
      return response.json();
    })
    .then((data) => {
      let foo = '';
      for (const food of data) {
        foo += `
          <tr>
            <td><input type="checkbox" name=""></td>
            <td>${food.id}</td>
            <td>${food.name}</td>
            <td><img src="${food.image}" alt="" style="width: 70px;"></td>
            <td>${food.price}</td>
            <td>
              <button class="btn btn-primary btn-sm trash" type="button" title="Xóa" onclick="confirmDelete(${food.id})">
                <i class="fas fa-trash-alt"></i>
              </button>
              <a href="edit_pro.html?id=${food.id}">
                <button class="btn btn-primary btn-sm edit" type="button" title="Sửa">
                  <i class="fa fa-edit"></i>
                </button>
              </a>
            </td>
          </tr>
        `;
      }
      document.getElementById('listfood')!.innerHTML = foo;
    })
    .catch((error) => {
      console.error('Lỗi khi tải dữ liệu:', error);
    });
}

//thêm food
function addFood() {
  let name = (document.getElementById("name") as HTMLInputElement).value;
  let price = parseInt((document.getElementById("price") as HTMLInputElement).value);
  let description = (document.getElementById("description") as HTMLInputElement).value;
  let image = (document.getElementById("image") as HTMLInputElement).value;
  const object = {
    "name": name,
    "price": price,
    "image": image,
    "description": description
  };
  console.log(object);

  const url2: string = `http://localhost:3000/food`;
  fetch(url2, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(object)
  })
    .then(function (res) {
      console.log(res);
      redirectToProListPage();
    })
    .catch(function (res) {
      console.log(res);
    });
}

//xóa food
function confirmDelete(id: number) {
  const confirmed = confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?");
  if (confirmed) {
    deleteFood(id);
  }
}

function deleteFood(id: number) {
  const deleteUrl = `http://localhost:3000/food/${id}`;
  fetch(deleteUrl, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Không thể kết nối mạng');
      }
      fetchAllProducts();
    })
    .catch((error) => {
      console.error('Lỗi khi xóa dữ liệu:', error);
    });
}

//load ra edit admin
function loadPro() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  var url = `http://localhost:3000/food?id=${id}`;
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Không thể kết nối mạng');
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      let proedit = '';
      proedit += `
        <form action="" method="PUT">
          <div class="row">
            <div class="form-group col-md-3">
              <label class="control-label">Tên món ăn</label>
              <input class="form-control" type="text" name="name" id="name" value="${data[0].name}">
            </div>
            <div class="form-group col-md-3">
              <label class="control-label">Giá</label>
              <input class="form-control" type="number" name="price" id="price" value="${data[0].price}">
            </div>
            <div class="form-group col-md-3">
              <label class="control-label">Hình ảnh</label>
              <input class="form-control" type="text" name="image" id="image" value="${data[0].image}">
            </div>
            <div class="form-group col-md-3">
              <label class="control-label">Mô tả</label>
              <textarea name="description" id="description" cols="30" rows="10">${data[0].description}</textarea>
            </div>
            <div class="form-group col-md-3">
              <label class="control-label">Danh Mục</label>
            </div>
          </div>
          <input class="btn btn-save" type="button" value="Cập nhật" onclick="editPost(${data[0].id})">
        </form>
      `;
      document.getElementById('result')!.innerHTML = proedit;
    })
}

//edit admin
function editPost(id: number) {
  let name = (document.getElementById("name") as HTMLInputElement).value;
  let price = parseInt((document.getElementById("price") as HTMLInputElement).value);
  let description = (document.getElementById("description") as HTMLInputElement).value;
  let image = (document.getElementById("image") as HTMLInputElement).value;
  const object = {
    "name": name,
    "price": price,
    "image": image,
    "description": description
  };
  const url2: string = `http://localhost:3000/food`;
  console.log(url2 + `/${id}`);
  fetch(url2 + `/${id}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    body: JSON.stringify(object)
  })
    .then((res) => {
      console.log(res);
      redirectToProListPage();
    })
    .catch((error) => {
      console.log(error);
    });
}

// Gọi hàm fetchAllProducts() để tải dữ liệu trang đầu tiên khi trang web được tải lần đầu
fetchAllProducts();
fetchIndex();
loadPro();
