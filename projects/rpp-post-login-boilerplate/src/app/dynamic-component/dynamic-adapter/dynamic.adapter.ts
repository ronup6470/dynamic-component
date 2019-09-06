import { Injectable } from '@angular/core';
// -------------------------------------------- //
import { Adapter } from 'common-libs';

import { Dynamic, } from '../dynamic.model';


/**
 * DynamicAdapter
 */
@Injectable()
export class DynamicAdapter implements Adapter<Dynamic> {

    /** This method is used to transform response object into T object. */
    public toResponse(item: Dynamic): Dynamic {
        const dynamic: Dynamic = new Dynamic(

        );
        return dynamic;
    }

    /** This method is used to transform T object into request object. */
    public toRequest(item: Dynamic): Dynamic {
        const dynamic: Dynamic = new Dynamic(

        );
        return dynamic;
    }
}

