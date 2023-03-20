export default function CreateState(props) {
  return (
    <div>
      <input
        value={props.inicial}
        onChange={props.onChangeIn}
        placeholder="inicial..."
      ></input>
      <input
        value={props.final}
        onChange={props.onChangeFin}
        placeholder="final..."
      ></input>
      <input
        type={"number"}
        value={props.probabilidade}
        onChange={props.onChangeProb}
        placeholder="probabilidade..."
      ></input>
      <button onClick={props.onClick}>+ estado</button>
    </div>
  );
}
