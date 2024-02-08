import React, {useState} from 'react';

export enum calculationType {
    OneByOne = 1,
    Set,
}

function OrderCalculationPage() {
  const [calcType, setCalcType] = useState<calculationType>(calculationType.OneByOne)

  return (
    <div>
      CalculationPage
    </div>
  );
}

export default OrderCalculationPage;
