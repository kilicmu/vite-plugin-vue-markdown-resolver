export class VALIDATE_REGS {
    static readonly NORMAL_TAG_VALIDATE = /^.*$/
    static readonly SUCCESS_TAG_VALIDATE = /^success(.*)$/
    static readonly WARNING_TAG_VALIDATE = /^warning(.*)$/
    static readonly ERROR_TAG_VALIDATE = /^error(.*)$/
}

export const MdSupportsContainer = {
    'success': VALIDATE_REGS.SUCCESS_TAG_VALIDATE,
    'warning': VALIDATE_REGS.WARNING_TAG_VALIDATE,
    'error': VALIDATE_REGS.ERROR_TAG_VALIDATE,
}