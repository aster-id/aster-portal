import type { HttpContext } from '@adonisjs/core/http'

export default class FaqController {
  async show({ inertia }: HttpContext) {
    return inertia.location('https://aster.place/faq')
  }
}
