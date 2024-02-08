import React, {useState} from 'react';

enum type {
    OneByOne = 1,
    Set,
}

function OrderCalculationPage() {
  const [calculationType, setCalculationType] = useState<type>(type.OneByOne)

  return (
    <div className="App">
      path {}
    </div>
  );
}

export default App;
