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

    // Configuração do Calendário para padrão brasileiro
    static calendarPtBr() {
        return {
            firstDayOfWeek: 0,
            dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
            dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
            dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
            monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            today: 'Hoje',
            clear: 'Limpar'
        }
    }

    // Converte data no padrão DD/MM/AAAA para DD-MM-AAAA
    static formatDate(date: string) {
        return date.replace("/", "-").replace("/", "-");
    }

    // Colocar mascara de moeda brasileira R$ X.XXX,XX
    static formatForCurrency() {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
        });
    }

    // Configuração para mascara de moeda brasileira para o campo de valor
    static imaskConfig() {
        return {
            mask: Number,
            scale: 2,
            thousandsSeparator: '.',
            padFractionalZeros: true,
            normalizeZeros: true,
            radix: ','
        }
    }

}