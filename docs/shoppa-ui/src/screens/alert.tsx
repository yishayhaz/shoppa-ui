import { Alert } from "@shoppa-ui/widgets/alert";
import { IoIosWarning } from "react-icons/io";

export function AlertScreen() {
  return (
    <div className="page d-flex flex-column gap-20">
      <Alert
        size="sm"
        variant="warning"
        icon={<IoIosWarning />}
        title="Watch out!"
        description="This is a warning alert"
      />
      <Alert size="sm" variant="danger" icon={"❗"} children="ds"></Alert>
      <Alert
        size="md"
        variant="primary"
        icon={"❗"}
        title="Important Message"
        description="לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית להאמית קרהשק סכעיט דז מא, מנכם למטכין נשואי מנורך. הועניב היושבב שערש שמחויט - שלושע ותלברו חשלו שעותלשך וחאית נובש ערששף."
      >
        dsa
      </Alert>
      <Alert
        size="lg"
        variant="success"
        icon={"❗"}
        title="Important Message"
        description="לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית להאמית קרהשק סכעיט דז מא, מנכם למטכין נשואי מנורך. הועניב היושבב שערש שמחויט - שלושע ותלברו חשלו שעותלשך וחאית נובש ערששף."
      ></Alert>
    </div>
  );
}
