export interface EventoTypes{
    grupo: string;
    nomeEvento: string;
    adminId: string;
    dataEvento: Date;
    horarioEvento: string;
    local: string;
    eventoAtiva: string|undefined;
    usuarios: [object];
}