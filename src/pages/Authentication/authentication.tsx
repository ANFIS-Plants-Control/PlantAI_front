import { Switcher } from "./components/switcher/Switcher";
import { Field } from "./components/field/Field";
import style from "./Autentication.module.css";

export function AuthenticationPage() {
  return (
    <div className={style.container}>
      <Switcher />
      <Field />
    </div>
  );
}
