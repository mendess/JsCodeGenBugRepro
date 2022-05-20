import * as sdk from 'JsCodeGenBugRepro';

import Wrapper = sdk.xyz.mendess.Wrapper;
import Adapter = sdk.xyz.mendess.Adapter;
import KtAdapter = sdk.xyz.mendess.KtAdapter;

class WebAdapter extends Adapter {
    override method(param: string = ""): void {
        console.log(param);
    }
}


{
    /*
     * Creating the wrapper with a class that was defined in the ktmp library works.
     */
    const user = new Wrapper(new KtAdapter());
    user.method('hello');
}
{
    /*
     * Creating the wrapper with a class defined in js, causes crashes whenever
     * a codepath touches a method with default parameters.
     */
    const user = new Wrapper(new WebAdapter());

    // This works because it doesn't call the method in WebAdapter.
    user.methodKt("hello");
    // this here crashes because it tries to call WebAdapter.method internally
    user.method("hello");
}

