import { JSX, useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import ElementListPanel from "../Components/ElementListPanel.tsx";
import ElementListSection from "../Components/ElementListSection.tsx";
import NavigationElement from "../Components/NavigationElement.tsx";
import ScriptVersionElement from "../Components/ScriptVersionElement.tsx";
import axiosInstance from "../../../utils/axios.ts";

import InteractionPanel from "../Components/InteractionPanel.tsx";
import SuggestionPanel from "../Components/SuggestionPanel.tsx";
import MessagePanel from "../Components/MessagePanel.tsx";

import "./index.css";

interface ScriptVersion {
    id: number;
    scenario_id: number;
    name: string;
    created_at: string;
}

export default function ScriptVersionsPanel(): JSX.Element {
    const { scenario_id } = useParams<{ scenario_id: string }>();
    const [versions, setVersions] = useState<ScriptVersion[]>([]);

    useEffect(() => {
        const fetchVersions = async () => {
            try {
                const response = await axiosInstance.get<ScriptVersion[]>(`/scenario/${scenario_id}/version/collection`);
                setVersions(response.data);
            } catch (error) {
                console.error("Error fetching script versions:", error);
            }
        };

        fetchVersions();

    }, [scenario_id]);

    const navigate = useNavigate();

    function handleReturnClick() {
        navigate("/");
    }
    function handleCreateNewVersion() { };
    console.log(versions);

    return (
        <>
            <div className="flex-layout">
                <ElementListPanel>
                    <ElementListSection>
                        <NavigationElement content="Return" handleClick={handleReturnClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M569 337C578.4 327.6 578.4 312.4 569 303.1L425 159C418.1 152.1 407.8 150.1 398.8 153.8C389.8 157.5 384 166.3 384 176L384 256L272 256C245.5 256 224 277.5 224 304L224 336C224 362.5 245.5 384 272 384L384 384L384 464C384 473.7 389.8 482.5 398.8 486.2C407.8 489.9 418.1 487.9 425 481L569 337zM224 160C241.7 160 256 145.7 256 128C256 110.3 241.7 96 224 96L160 96C107 96 64 139 64 192L64 448C64 501 107 544 160 544L224 544C241.7 544 256 529.7 256 512C256 494.3 241.7 480 224 480L160 480C142.3 480 128 465.7 128 448L128 192C128 174.3 142.3 160 160 160L224 160z" /></svg>
                        </NavigationElement>
                        <NavigationElement content="Create new version" handleClick={handleCreateNewVersion}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M160 144C151.2 144 144 151.2 144 160L144 480C144 488.8 151.2 496 160 496L480 496C488.8 496 496 488.8 496 480L496 160C496 151.2 488.8 144 480 144L160 144zM96 160C96 124.7 124.7 96 160 96L480 96C515.3 96 544 124.7 544 160L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 160zM296 408L296 344L232 344C218.7 344 208 333.3 208 320C208 306.7 218.7 296 232 296L296 296L296 232C296 218.7 306.7 208 320 208C333.3 208 344 218.7 344 232L344 296L408 296C421.3 296 432 306.7 432 320C432 333.3 421.3 344 408 344L344 344L344 408C344 421.3 333.3 432 320 432C306.7 432 296 421.3 296 408z" /></svg>
                        </NavigationElement>
                    </ElementListSection>
                    <ElementListSection title="Versions">
                        {versions.map((version) => {
                            return (
                                <ScriptVersionElement
                                    key={version.id}
                                    id={version.id}
                                    scenario_id={version.scenario_id}
                                    name={version.name}
                                />
                            );
                        })}
                    </ElementListSection>
                </ElementListPanel>
                <div style={{ flexGrow: 1 }}>
                    <div>
                        <InteractionPanel>
                            <SuggestionPanel />
                            <MessagePanel height={220}>
                            </MessagePanel>
                        </InteractionPanel>
                    </div>
                </div>
            </div>
        </>
    );
}
