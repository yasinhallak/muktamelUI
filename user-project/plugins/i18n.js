import { configure } from "vee-validate/dist/vee-validate.full";

export default function({ app }) {
  configure({
    defaultMessage: (field, values) => {
      //console.log("FFField:", field);
      //console.log("VVValues:", values);
      //values._field_ = app.i18n.t(`fields.${field}`);
      return app.i18n.t(`validation.${values._rule_}`, values);
    }
  });
}
