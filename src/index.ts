import { Base } from "./base";
import { Movies } from "./movies";
import { applyMixins } from "./utils";

class Lotr extends Base { }
interface Lotr extends Movies { }

applyMixins(Lotr, [Movies])

export default Lotr;