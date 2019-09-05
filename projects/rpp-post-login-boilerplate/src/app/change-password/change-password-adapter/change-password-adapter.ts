

/**
 * @author Ronak Patel.
 * @description This is adapter service use for transforming data base user requirement. 
 */

import { Injectable } from '@angular/core';
// -------------------------------------------- //
import { Adapter } from 'common-libs';

 import {ChangePassword,} from '../change-password.model'; 




@Injectable()
export class ChangePasswordAdapter implements Adapter<ChangePassword> {

    /** This method is used to transform response object into T object. */
    public toResponse(items: ChangePassword): ChangePassword{
        const changePassword: ChangePassword= new ChangePassword(
                items.oldPassword,            
                items.newPassword,            
        );
        return changePassword;
    }

    /** This method is used to transform T object into request object. */
    public toRequest(items: any): ChangePassword{
        const changePassword: ChangePassword= new ChangePassword(
                items.currentPassword,
                items.newPassword
        );
        return changePassword;
    }
}




