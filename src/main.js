const toggle = document.querySelector('.nav__toggle')
const menu = document.querySelector('.nav__menu')

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true'
    toggle.setAttribute('aria-expanded', String(!expanded))
    menu.classList.toggle('is-open')
  })

  menu.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false')
      menu.classList.remove('is-open')
    })
  })

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      toggle.setAttribute('aria-expanded', 'false')
      menu.classList.remove('is-open')
      toggle.focus()
    }
  })
}

const yearEl = document.getElementById('footer-year')
if (yearEl) yearEl.textContent = String(new Date().getFullYear())
