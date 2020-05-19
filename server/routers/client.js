import { Controller, Get } from '../decorator/router'
import api from '../api'

@Controller('/client')
class ClientController {

    @Get('/all')
    async categorAll(ctx, next) {
        const cat = await api.client.getAllCategorys()

        ctx.body = {
            errorCode: 0,
            data: cat
        }
    }
}