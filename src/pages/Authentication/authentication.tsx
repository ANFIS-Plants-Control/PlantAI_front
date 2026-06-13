import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import plant from "../../Shared/images/plant.png";
import { Field } from "./components/field/Field";
import { Switcher } from "./components/switcher/Switcher";
import style from "./Autentication.module.css";

export function AuthenticationPage() {
  return (
    <div className={style.container}>
      <div className={style.glow_top} />
      <div className={style.glow_bottom} />

      <section className={style.hero}>
        <div className={style.brand}>
          <span className={style.brand_icon}>
            <img src={plant} alt="" />
          </span>
          <span>PlantAI</span>
        </div>

        <div className={style.hero_content}>
          <div className={style.eyebrow}>
            <AutoAwesomeOutlinedIcon fontSize="small" />
            Умное выращивание
          </div>

          <p>
            Следите за микроклиматом, управляйте устройствами и получайте
            понятные рекомендации в едином пространстве.
          </p>

          <div className={style.benefits}>
            <div className={style.benefit}>
              <span>
                <InsightsOutlinedIcon />
              </span>
              <div>
                <strong>Данные в реальном времени</strong>
                <small>Вся важная информация всегда под рукой</small>
              </div>
            </div>
            <div className={style.benefit}>
              <span>
                <ShieldOutlinedIcon />
              </span>
              <div>
                <strong>Надёжное управление</strong>
                <small>Безопасный доступ к вашей системе</small>
              </div>
            </div>
          </div>
        </div>

        <div className={style.hero_note}>
          <span className={style.status_dot} />
          Система готова к работе
        </div>
      </section>

      <section className={style.form_side}>
        <div className={style.form_wrapper}>
          <Switcher />
          <Field />
        </div>
        <p className={style.privacy}>
          Продолжая, вы соглашаетесь с правилами сервиса и политикой
          конфиденциальности
        </p>
      </section>
    </div>
  );
}
