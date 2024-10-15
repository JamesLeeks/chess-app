import { getGreeting } from "../../../../common/src/foo";

export function FooComponent() {
	return <>{getGreeting("James!!!!")}</>;
}
