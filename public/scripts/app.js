window.addEventListener("load", function (e) {
  Currency();
  function Currency() {
    const toCurrency = (price) => {
      return new Intl.NumberFormat("en-EN", {
        currency: "usd",
        style: "currency",
      }).format(price);
    };

    document.querySelectorAll(".price").forEach((elem) => {
      elem.textContent = toCurrency(elem.textContent);
    });

  }

  // ============================== price input multiplier ===========================


  AddWorkers();
  function AddWorkers() {
    const addWorker = document.querySelectorAll(".addWorker");
    const cardBody = document.querySelector(".cardBody");

    let i = 0;
    addWorker.forEach((elem) => {
      elem.addEventListener("click", () => {
        i++;
        const worker = document.createElement(`div`);
        worker.classList.add("workerBlock");
        fetch("/projects/add/worker", {
          method: "get",
        })
          .then((res) => res.json())
          .then((workers) => {
            const html = workers.map((c) => {
              return `
                  <option value="${c._id}">${c.fullname}</option>
                `;
            });
            worker.innerHTML = `
            <div class="form-group col-6">
            <label for="selectGroup${i}">Minimal</label>
            <select id="selectGroup${i}" class="form-control select2" name="workers" style="width: 100%;">
              ${html}
            </select>
            </div>
             <div class="form-group col-6">
                  <label for="inputEstimatedBudget${i}">Worker payment - %</label>
                  <input max="100" type="number" id="inputEstimatedBudget${i}" class="form-control" name="workerPayment">
              </div>
              <div class="crossRow">
                  <p class="removeWorker"><svg class="removeWorker"
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    version="1.1"
                    viewBox="0 0 16 16"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  ><path class="removeWorker"
                      d="M15.854 12.854c-0-0-0-0-0-0l-4.854-4.854 4.854-4.854c0-0 0-0 0-0 0.052-0.052 0.090-0.113 0.114-0.178 0.066-0.178 0.028-0.386-0.114-0.529l-2.293-2.293c-0.143-0.143-0.351-0.181-0.529-0.114-0.065 0.024-0.126 0.062-0.178 0.114 0 0-0 0-0 0l-4.854 4.854-4.854-4.854c-0-0-0-0-0-0-0.052-0.052-0.113-0.090-0.178-0.114-0.178-0.066-0.386-0.029-0.529 0.114l-2.293 2.293c-0.143 0.143-0.181 0.351-0.114 0.529 0.024 0.065 0.062 0.126 0.114 0.178 0 0 0 0 0 0l4.854 4.854-4.854 4.854c-0 0-0 0-0 0-0.052 0.052-0.090 0.113-0.114 0.178-0.066 0.178-0.029 0.386 0.114 0.529l2.293 2.293c0.143 0.143 0.351 0.181 0.529 0.114 0.065-0.024 0.126-0.062 0.178-0.114 0-0 0-0 0-0l4.854-4.854 4.854 4.854c0 0 0 0 0 0 0.052 0.052 0.113 0.090 0.178 0.114 0.178 0.066 0.386 0.029 0.529-0.114l2.293-2.293c0.143-0.143 0.181-0.351 0.114-0.529-0.024-0.065-0.062-0.126-0.114-0.178z"></path></svg></p>
               </div>
            `;
            cardBody.appendChild(worker);
            const crosRow = document.querySelectorAll(".workerBlock");
            crosRow.forEach((elem) => {
              elem.addEventListener("click", function (event) {
                if (event.target.classList.contains("removeWorker")) {
                  this.remove();
                }
              });
            });
          });
      });
    });

    const crosRow = document.querySelectorAll(".workerBlock");
    crosRow.forEach((elem, index, parent) => {
      elem.addEventListener("click", function (event) {
        if (event.target.classList.contains("removeWorker")) {
          this.remove();
        }
      });
    });
  }

  const trNumber = document.querySelectorAll(".trNumber");
  toNumber(trNumber);
  function toNumber(array) {
    array.forEach((elem, index) => {
      elem.innerHTML = index + 1;
    });
  }

  getDate();
  function getDate() {
    const projectDate = document.querySelector("#projectDate");
    const API_KEY = `f1853ee01aed56726d2207e7fb40c534`;
    navigator.geolocation.getCurrentPosition((succes) => {
      let { latitude, longitude } = succes.coords;
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`
       )
        .then((res) => res.json())
        .then((data) => {
          const date = window
            .moment(data.current.dt * 1000)
            .format("YYYY-MM-DD");
          if (projectDate) {
            projectDate.setAttribute("value", date);
          }
        });
    });
  }





  getRealTime();
  function getRealTime() {
    const logoDate = document.querySelector(".logoDate");
    const logoTime = document.querySelector(".logoTime");
    fetch("http://worldtimeapi.org/api/timezone/Asia/Tashkent")
      .then((res) => res.json())
      .then((data) => {
        logoTime.innerHTML = window.moment(data.datetime).format("HH:mm:ss");
        logoDate.innerHTML = window.moment(data.datetime).format("YYYY-MM-DD");
      });

    setInterval(() => {
      fetch("http://worldtimeapi.org/api/timezone/Asia/Tashkent")
        .then((res) => res.json())
        .then((data) => {
          logoTime.innerHTML = window.moment(data.datetime).format("HH:mm:ss");
          logoDate.innerHTML = window
            .moment(data.datetime)
            .format("YYYY-MM-DD");
        });
    }, 1000);
  }


  //  ========================= price =======================================

  const number = document.querySelectorAll('.numbers')
  number.forEach((elem, index) => {
    elem.innerHTML = index + 1
  })


});

 





