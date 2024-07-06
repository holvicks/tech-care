//setiing up the basic authentication
const staticData = [
  {
    "name": "Jessica Taylor",
    "gender": "Female",
    "age": 28,
    "profile_picture": "https://fedskillstest.ct.digital/4.png",
    "date_of_birth": "1996-08-23",
    "phone_number": "(415) 555-1234",
    "emergency_contact": "(415) 555-5678",
    "insurance_type": "Sunrise Health Assurance",
    "diagnosis_history": [
      {
        "month": "March",
        "year": 2024,
        "blood_pressure": {
          "systolic": {
            "value": 160,
            "levels": "Higher than Average"
          },
          "diastolic": {
            "value": 78,
            "levels": "Lower than Average"
          }
        },
        "heart_rate": {
          "value": 78,
          "levels": "Lower than Average"
        },
        "respiratory_rate": {
          "value": 20,
          "levels": "Normal"
        },
        "temperature": {
          "value": 98.6,
          "levels": "Normal"
        }
      }
      // Additional months of diagnostic history
    ],
    "diagnostic_list": [
      {
        "name": "Hypertension",
        "description": "Chronic high blood pressure",
        "status": "Under Observation"
      }
      // Additional diagnostics
    ],
    "lab_results": [
      "Blood Tests",
      "CT Scans"
      // More lab results
    ]
  }
];




const username = 'coalition'
const password = 'skills-test';
const encodeCredentials = btoa(`${username}:${password}`);
const apiUrl = 'https://fedskillstest.coalitiontechnologies.workers.dev';

//fetch patients data
const patientsData = async () => {
    try{
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers:{
                'Authorization': `Basic ${encodeCredentials}`
            }
        });

        if(!response.ok){
            throw new Error('response was not ok')
        }
        const data= await response.json();
        displayPatients(data);
    }
    catch(error) {
        console.error('There was a problem with the fetch operation', error)
        displayPatients(staticData);
    }
};

//displaying list of paties
const displayPatients = (data) => {
    const patientsDiv = document.getElementById('patient-list');
    patientsDiv.innerHTML = '';

    data.forEach(patient => {
        const patientDiv = document.createElement('div');
        patientDiv.innerHTML = `
        <div class="patient-details-container">

        <div class="patient-details-inner-container">
        <div class="patient-details">
        <img src="${patient.profile_picture}" alt="${patient.name}" style="height:50px; width:50px;"> 
        </div>

        <div class="patient-info">
        <div class="patient-name">${patient.name}</div>
          <div class="more-patient-profile">
          <small>${patient.gender}, ${patient.age} </small>
          </div>
        </div>
        
        </div>
        <div class="more-horizontal">
        <img src="./assets/icons/more-horiz.png">
        </div>
        

      
        </div>`

        
        ;
        patientDiv.onclick = () => displayPatientsDetails(patient);
        patientsDiv.appendChild(patientDiv);

        if(patient.name === 'Jessica Taylor'){
            displayPatientsDetails(patient);
        }
    });
};

const displayPatientsDetails = (patient) => {
    const patientsDiv = document.getElementById('patient-details');
    const analysis = document.getElementById('analysis');
    const rateLevel = document.getElementById('heart-rate');
    const respiratoryRate = document.getElementById('respiratory-rate');
    const temperatureLevel = document.getElementById('temperature-level');
                                                                             
    patientsDiv.innerHTML = `
    <div class="jessica-details">
    <img src="${patient.profile_picture}" alt="${patient.name}"/>
    <h2>${patient.name}</h2>

    <div class="display-profile">

    <div class="dob">
    <img src="./assets/icons/BirthIcon.png">
     <!---->
    <div class="profile-content">
    <p>Date of Birth: </p>
    <p> <b>${patient.date_of_birth}</b></p>
    </div>
    </div>
   
    <div class="gender">
    <img src="./assets/icons/BirthIcon.png">
    <!---->
    <div class="profile-content">
    <p>Gender : </p>
    <p> <b> ${patient.gender}</b></p>
    </div>
    </div>

    <div class="contact">
    <img src="./assets/icons/BirthIcon.png">
    <!---->
    <div class="profile-content">
    <p> Contact Info: </p>
    <b> ${patient.phone_number}</b>
    </div>
    </div>


    <div class="emergency-contact">
    <img src="./assets/icons/BirthIcon.png">
    <!---->
    <div class="profile-content">
    <p> Emergency Contacts:  </p>
    <p> <b>${patient.emergency_contact}</b></p>
    </div>
    </div>

    <div class="insurance">
    <img src="./assets/icons/BirthIcon.png">
    <!---->
    <div class="profile-content">
    <p> Insurance provider:</p>
   <p> <b> ${patient.insurance_type}</b></p>
   </div>
    </div>
    <div>

    <button type="button" class="btn-contact"> Show All Information </button>
    </div>
    `;

    

    let diagnosisHistoryHTML = '';  
    let heartRateDiv = '';
    let respiratoryRateDiv = '';
    let temperatureLevelDiv = '';
 

      patient.diagnosis_history.forEach(entry => {
        diagnosisHistoryHTML = `
        <div class="systolic-container">
            <div class="systolic-content">
            <span class="circle"></span>
            <span class="text">Systolic</span>
          </div>
              <h2 class="level-value">  ${entry.blood_pressure.systolic.value} </h2>
          <p class="level"> <span><img src="./assets/icons/ArrowUp.png"/>  ${entry.blood_pressure.systolic.levels}</span></p>
          </div>

         <div class="border-bottom"></div>

         <div class="diastolic-container">
         <div class="diastolic-content">
         <span class="diastolic-circle"></span>
         <span class="text">Diastolic</span>
       </div>

       <h2 class="level-value">  ${entry.blood_pressure.diastolic.value}</h2>
       <p class="level"> <span><img src="./assets/icons/ArrowDown.png"/>  ${entry.blood_pressure.diastolic.levels}</span></p>
              </div>
        `;


        respiratoryRateDiv = `
        <div class="respiratoryDiv">
        <img src="./assets/icons/respiratory-rate.png""/>
        <p>Respiratory Rate:</p>
        <h2> ${entry.respiratory_rate.value} bpm</h2>
        <p class="respiratorylevel"> (${entry.respiratory_rate.levels})</p>
        <div>
        `;


        temperatureLevelDiv = `
        <div class="temperatureDiv">
        <img src="./assets/icons/temperature.png""/>
        <p>Temperature:</p>
        <h2> ${entry.temperature.value} <sup>o</sup>F</h2>
        <p class="temperaturelevel">(${entry.temperature.levels})</p>
        </div>`;

        heartRateDiv= `
        <div class="heartDiv">
        <img src="./assets/icons/heart.png""/>
        <p>Heart Rate:</p>
        <h2> ${entry.heart_rate.value}  bpm </h2>
        <p class="heartlevel"> (${entry.heart_rate.levels})</p>
        </div>
        `;
        
      });
      diagnosisHistoryHTML += '</ul>';
      analysis.innerHTML = diagnosisHistoryHTML;
      rateLevel.innerHTML = heartRateDiv;
      respiratoryRate.innerHTML = respiratoryRateDiv;
      temperatureLevel.innerHTML = temperatureLevelDiv;

    
 

    
};



patientsData();



/* Chart Js */
const labels = ['Oct, 2023', 'Nov, 2023', 'Dec, 2023', 'Jan, 2024', 'Feb, 2024', 'Mar, 2024'];
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Systolic',
          data: [120, 118, 160, 116, 154, 158],
          borderColor: '#E66FD2',
          backgroundColor: '#E66FD2 0% 0% no-repeat padding-box',
          tension: 0.4,
          pointBackgroundColor: '#E66FD2',
          pointRadius: 5,
        },
        {
          label: 'Diastolic',
          data: [110, 64, 108, 92, 72, 78],
          borderColor: ' #8C6FE6',
          backgroundColor: '#8C6FE6 0% 0% no-repeat padding-box',
          tension: 0.4,
          pointBackgroundColor: '#8C6FE6',
          pointRadius: 5,
        }
      ]
    };

    const config = {
      type: 'line',
      data: data,
      options: {
        animations: {
          radius: {
            duration: 400,
            easing: 'linear',
            loop: (context) => context.active
          }
        },
        hoverRadius: 12,
        hoverBackgroundColor: 'yellow',
        interaction: {
          mode: 'nearest',
          intersect: true,
          axis: 'x'
        },
        plugins: {
          tooltip: {
            enabled: true
          },
          legend: {
            position: 'top',
            labels: {
              usePointStyle: true
            }
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            min: 60,
            max: 180,
            ticks: {
              stepSize: 20
            }
          }
        }
      }
    };

    // Initialize the chart
    const ctx = document.getElementById('bloodPressureChart').getContext('2d');
    new Chart(ctx, config);