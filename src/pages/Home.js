import { useState } from 'react';
import Quiz from '../component/Quiz';
import SplashScreen from '../component/SplashScreen';
import Apps from '../component/Register';




function Home() {

    const [facet, setFacet] = useState('isSplashScreen');

    const setNextFacet = value => { setFacet(value) }

    return (
        <div className="App">
            {facet === 'isSplashScreen' && <SplashScreen nextFacet={setNextFacet} />}
            {facet === 'isRegister' && <Apps nextFacet={setNextFacet} />}
            {facet === 'isQuiz' && <Quiz nextFacet={setNextFacet} />}
        </div>
    );
}

export default Home;
