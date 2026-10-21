
import { createParamDecorator, ExecutionContext} from '@nestjs/common';
import { AuthenticatedUser } from './authenticated-user.interface.js';


export const CurrentUser = createParamDecorator((
    _data: unknown,
    context: ExecutionContext,
  ): AuthenticatedUser | undefined => {

    const request = context.switchToHttp().getRequest<{ user?: AuthenticatedUser}>();

    return request.user;
  },
);


//How it works
//- createParamDecorator() creates a custom decorator for controller parameters.
//- ExecutionContext lets the decorator access the current HTTP request.
//- request.user contains the payload your AuthGuard attached after verifying the JWT.
//- The _data parameter is unused for now. NestJS supplies it as the optional argument for passing extra decorator data later.
