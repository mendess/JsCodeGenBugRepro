@file:OptIn(ExperimentalJsExport::class)

package xyz.mendess

import kotlin.js.JsExport
import kotlin.js.JsName

@JsExport
abstract class Adapter {
    @JsName("method")
    abstract fun method(param: String = "")
}

@JsExport
class Wrapper(private val adapter: Adapter) {

    private val ktAdapter: KtAdapter = KtAdapter()

    /**
     * Call the method defined in the external in adapter
     *
     * # Note
     * This crashes when [adapter] is extended externally
     */
    fun method(param: String) {
        adapter.method(param)
    }

    /**
     * Call a locally defined version of the adapter
     */
    fun methodKt(param: String) {
        ktAdapter.method(param)
    }
}

@JsExport
class KtAdapter : Adapter() {
    override fun method(param: String) {
        println(param)
    }
}
