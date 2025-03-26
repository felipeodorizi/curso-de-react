
import { ChevronLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

function TaskPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const title = searchParams.get("title");
    const description = searchParams.get("description");
    return (
    <div className="h-screen w-screen mx-auto bg-slate-500 p-6">
        <div className="flex"> 
            <button onClick={() => navigate(-1)} className="text-slate-100"> <ChevronLeftIcon /> </button>
            <h1 className="text-3xl text-slate-100 font-bold text-center">Detalhes da Tarefa</h1>
        </div>
        
        <div className="bg-slate-200 p-4 rounded-md">
            <h2 className="text-xl font-bold text-slate-600"> {title}</h2>
            <p className="text-slate-600"> {description} </p>
        </div>
    </div>
    );
}

export default TaskPage;
