export class Util {
    constructor() { }

    // Formata uma string para o padrão de moeda Brasileira.
    static formatReal(value: string) {
        var tmp = value.replace('.', '');
        tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
        if (tmp.length > 6)
            tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");

        return tmp;
    }
}