import { useState } from "react";
import Input from "../atoms/input";
import NumberInput from "../atoms/number-input";
import CheckBox from "../atoms/check-box";
import Accordion from "../atoms/accordion";

type SSHPanelType = {
    className?: string;
}

const SSHPanel = ({ className }: SSHPanelType) => {

    const [cwd, setCwd] = useState<string>('');
    const [sudo, setSudo] = useState<boolean>(false);
    const [time, setTime] = useState<number>(10);
    const [docker, setDocker] =useState<string>('commune');
    const [dockerStatus, setDockerStatus] = useState<boolean>(false);
    const [func, setFunc] =useState<string>('x');
    const [numColumn, setNumColumn] = useState<number>(2);

    return (
        <div className={`${className}`}>
            <Accordion label={<h2 className="text-lg md:text-xl text-blue-500 font-medium">Parameters</h2>}>
                <div className="mt-6 flex justify-start gap-6 items-end">
                    <Input label="cwd" name="cwd" placeholder="/" className="w-[200px]" value={cwd} setValue={(val) => setCwd(val)}/>
                    <NumberInput className="w-[200px]" name="timeout" label="Timeout" value={time} setValue={setTime}/>
                    <CheckBox id="sudo" name="sudo" label="sudo" value={sudo} onChange={ val => setSudo(!val)}/>
                </div>
                <hr className="my-[50px]" />
                <h2 className="text-3xl text-gray-100 font-medium">
                    Docker
                </h2>
                <div className="mt-6 flex justify-start gap-6 items-end">
                    <Input label="Docker container" name="docker-container" placeholder="commune" className="w-[400px]" value={docker} setValue={(val) => setDocker(val)}/>
                    <CheckBox id="enable-docker" name="enable-docker" label="Enable docker" value={dockerStatus} onChange={ val => setDockerStatus(!val)}/>
                </div>
                <hr className="my-[50px]" />
                <h2 className="text-3xl text-gray-100 font-medium">
                    Function
                </h2>
                <div className="mt-6 flex justify-start gap-6 items-end">
                    <Input label="Function" name="function" placeholder="X" className="w-[400px]" value={func} setValue={(val) => setFunc(val)}/>
                    <NumberInput className="w-[150px]" name="num-columns" label="Num columns" value={numColumn} setValue={setNumColumn}/>
                </div>
            </Accordion>
        </div>
    )
}


export default SSHPanel;