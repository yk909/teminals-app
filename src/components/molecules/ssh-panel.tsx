import { useState } from "react";
import Input from "../atoms/input";
import NumberInput from "../atoms/number-input";
import CheckBox from "../atoms/check-box";
import Accordion from "../atoms/accordion";
import Select from "../atoms/select";
import Button from "../atoms/button";


type SSHPanelType = {
    className?: string;
}

const hosts = ['computer1','computer2','computer3', ]

const SSHPanel = ({ className }: SSHPanelType) => {

    const [cwd, setCwd] = useState<string>('');
    const [sudo, setSudo] = useState<boolean>(false);
    const [time, setTime] = useState<number>(10);
    const [docker, setDocker] =useState<string>('commune');
    const [dockerStatus, setDockerStatus] = useState<boolean>(false);
    const [func, setFunc] =useState<string>('x');
    const [numColumn, setNumColumn] = useState<number>(2);
    const [search, setSearch] = useState<string>('');
    const [host, setHost] = useState<string>('');
    const [command, setCommand] = useState<string>('ls');

    const onClickRun = () => {
        
    }

    const onClickStop = () => {

    }


    return (
        <div className={`${className}`}>
            <Accordion label={<h2 className="text-lg md:text-xl text-blue-500 font-medium">Parameters</h2>}>
                <div className="flex justify-start gap-6 items-end">
                    <Input label="cwd" name="cwd" placeholder="/" className="w-[200px]" value={cwd} setValue={(val) => setCwd(val)}/>
                    <NumberInput className="w-[200px]" name="timeout" label="Timeout" value={time} setValue={setTime}/>
                    <CheckBox id="sudo" name="sudo" label="sudo" value={sudo} onChange={ val => setSudo(!val)}/>
                </div>
                <hr className="my-[10px]" />
                <h2 className="text-3xl text-gray-100 font-medium">
                    Docker
                </h2>
                <div className="mt-[10px] flex justify-start gap-6 items-end">
                    <Input label="Docker container" name="docker-container" placeholder="commune" className="w-[400px]" value={docker} setValue={(val) => setDocker(val)}/>
                    <CheckBox id="enable-docker" name="enable-docker" label="Enable docker" value={dockerStatus} onChange={ val => setDockerStatus(!val)}/>
                </div>
                <hr className="my-[10px]" />
                <h2 className="text-3xl text-gray-100 font-medium">
                    Function
                </h2>
                <div className="mt-[10px] flex justify-start gap-6 items-end">
                    <Input label="Function" name="function" placeholder="X" className="w-[400px]" value={func} setValue={(val) => setFunc(val)}/>
                    <NumberInput className="w-[150px]" name="num-columns" label="Num columns" value={numColumn} setValue={setNumColumn}/>
                </div>
            </Accordion>
            <div>
                <Input label="search" name="input-search" placeholder="" className="mt-3 w-full" value={search} setValue={(val) => setSearch(val)}/>
                <Select label="Hosts" name="select-hosts" className="mt-3 w-full" value={host} valueItems={hosts} setValue={(val) => setHost(val)}/>
                <Input label="commands" name="input-commands" placeholder="" className="mt-3 w-full" value={command} setValue={(val) => setCommand(val)}/>
                <div className="mt-5 flex justify-center items-center gap-6">
                    <Button onClick={onClickRun} className="" label="Run" />
                    <Button onClick={onClickStop} className="" label="Stop" />
                </div>
            </div>
        </div>
    )
}


export default SSHPanel;