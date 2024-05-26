import { useState } from "react";
import Input from "../atoms/input";
import NumberInput from "../atoms/number-input";
import CheckBox from "../atoms/check-box";
import Accordion from "../atoms/accordion";
import Select from "../atoms/select";
import Button from "../atoms/button";


type ManageHostsType = {
    className?: string;
}

const hosts = ['computer1','computer2','computer3', ]


const ManageHosts = ({ className }: ManageHostsType) => {

    const [user, setUser] = useState<string>('');
    const [host, setHost] = useState<string>('');
    const [port, setPort] = useState<number>(22);
    const [name, setName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    
    const [newName, setNewName] = useState<string>('');

    const onClickAddHost = () => {
        
    }

    const onClickRemoveHost = () => {
        
    }

    return (
        <div className={`${className}`}>
            <Accordion label={<h2 className="text-lg md:text-xl text-blue-500 font-medium">host2ssh</h2>}>
                <Select label="Search" name="select-hosts" className="w-full" value={host} valueItems={hosts} setValue={(val) => setHost(val)}/>
                <div className="mt-3 w-full py-[5px] px-[10px] rounded-md bg-[#f2f2f2] text-xl text-black">
                    &#123; &#125;
                </div>
            </Accordion>
            <div className="mt-5"></div>
            <Accordion label={<h2 className="text-lg md:text-xl text-blue-500 font-medium text-nowrap">Add host</h2>}>
                <h2 className="font-bold text-2xl">
                    Hosts
                </h2>
                <div className="flex justify-between items-center gap-6">
                    <Input label="User" name="input-user" className="" value={user} setValue={(val) => setUser(val)} />
                    <Input label="Host" name="input-host" className="" value={host} setValue={(val) => setHost(val)} />
                    <NumberInput label="Port" name="input-port" className="" value={port} setValue={(val) => setPort(val)}  />
                </div>
                <div className="flex justify-between items-center gap-6">
                    <Input label="Name" name="input-name" className="w-full" value={name} setValue={(val) => setName(val)} />
                    <Input type="password" label="Password" name="input-password" className="w-full" value={password} setValue={(val) => setPassword(val)} />
                </div>
                <div className="mt-5 flex justify-center">
                    <Button onClick={onClickAddHost} className="" label="Add Host" />
                </div>
            </Accordion>           
            <div className="mt-5"></div>
            <Accordion label={<h2 className="text-lg md:text-xl text-blue-500 font-medium text-nowrap">Remove Host</h2>}>
                <Select label="Host to Remove" name="select-hosts" className="w-full" value={host} valueItems={hosts} setValue={(val) => setHost(val)}/>
                <div className="mt-2 flex justify-center">
                    <Button onClick={onClickRemoveHost} className="mx-auto mt-5" label="Remove Host" />
                </div>
            </Accordion>
            <div className="mt-5"></div>
            <Accordion label={<h2 className="text-lg md:text-xl text-blue-500 font-medium text-nowrap">Rename Host</h2>}>
                <Select label="Host Name" name="select-hosts" className="w-full" value={host} valueItems={hosts} setValue={(val) => setHost(val)}/>
                <Input label="New Host Name" name="input-new-name" className="w-full mt-3" value={newName} setValue={(val) => setNewName(val)} />
                <div className="mt-2 flex justify-center">
                    <Button onClick={onClickRemoveHost} className="mx-auto mt-5" label="Remove Host" />
                </div>
            </Accordion>

        </div>
    )
}


export default ManageHosts;