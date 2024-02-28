const loadPhone = async (searchText = "13", isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  const phoneContainer = document.getElementById("phone-container");
  // clear phone container before adding new cards
  phoneContainer.textContent = "";

  // display show all button if there are more than 8 phones
  const showAllContainer = document.getElementById("show-all-container");
  if (phones.length > 8 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }

  console.log(phones.length);
  console.log("is show all", isShowAll);
  // display only first 8 phones if not show all
  if (!isShowAll) {
    phones = phones.slice(0, 8);
  }

  phones.forEach((phone) => {
    // console.log(phone);
    // 2 create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card  bg-gray-100 p-4 shadow-xl`;
    // 3 set inner html
    phoneCard.innerHTML = `
    <figure>
    <img
      src="${phone.image}"
      alt="Phone"
    />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${phone.phone_name}</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions justify-center">
      <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
    </div>
  </div>`;
    // 4 append child
    phoneContainer.appendChild(phoneCard);
  });
  // hide loading spinner
  toggleLoading(false);
};

// handle search button
const handleSearch = (isShowAll) => {
  toggleLoading(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhone(searchText, isShowAll);
};
// loading spinner function
const toggleLoading = (isLoading) => {
  const loading = document.getElementById("loading");
  if (isLoading) {
    loading.classList.remove("hidden");
  } else {
    loading.classList.add("hidden");
  }
};

// handle show all
const handleShowAll = () => {
  handleSearch(true);
};

// handle show detail
const handleShowDetail = async (id) => {
  console.log(id);
  // load single phone data
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  console.log(data);

  const phoneInfo = data.data;
  showPhoneDetails(phoneInfo);
};

const showPhoneDetails = (phone) => {
  const phoneName = document.getElementById("phone-name");
  phoneName.innerText = phone.name;

  const showDetailContainer = document.getElementById("show-detail-container");
  showDetailContainer.innerHTML = `
    <img src="${phone.image}" alt="" />
    <p><span>Storage:</span>${phone?.mainFeatures?.storage}</p>
    <p><span>GPS:</span>${phone?.others?.GPS || "No GPS available"}</p>
    <p><span>GPS:</span>${
      phone?.others?.GPS ? phone.others.GPS : "No GPS available"
    }</p>
  `;
  //show modal
  show_details_modal.showModal();
};

loadPhone();
