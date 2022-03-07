const multiStepForm = document.querySelector("[data-multi-step]")
const formSteps = [...multiStepForm.querySelectorAll("[data-step]")]
const progressSteps = document.querySelectorAll(".card-number-box")
const progressBar = document.querySelectorAll(".hr")


let currentStep = formSteps.findIndex(step => {
  return step.classList.contains("active")
})

if (currentStep < 0) {
  currentStep = 0
  showCurrentStep()
  showProgressStep()
}


multiStepForm.addEventListener("click", e => {
  let incrementor
  if (e.target.matches("[data-next]")) {
    incrementor = 1
  } else if (e.target.matches("[data-previous]")) {
    incrementor = -1
  }

  if (incrementor == null) return

  const inputs = [...formSteps[currentStep].querySelectorAll("input")]
  const allValid = inputs.every(input => input.reportValidity())
  if (allValid) {
    currentStep += incrementor
    showCurrentStep()
    showProgressStep()
    showProgressBar()
  }

})

formSteps.forEach(step => {
  step.addEventListener("animationend", e => {
    formSteps[currentStep].classList.remove("hide")
    e.target.classList.toggle("hide", !e.target.classList.contains("active"))
  })
})

function showCurrentStep() {
  formSteps.forEach((step, index) => {
    step.classList.toggle("active", index === currentStep)
    
  })
}

function showProgressStep() {
  progressSteps.forEach((progressStep, index) => {
    if (index < currentStep + 1) {
      progressStep.classList.add("active")
    } else {
      progressStep.classList.remove("active")
    }
  })
}

function showProgressBar() {
  progressBar.forEach((bar, index) => {
    if (index < currentStep) {
      bar.classList.add("active")
    } else {
      bar.classList.remove("active")
    }
  })
}