export interface Position {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface Offset extends Position {
    align: Align;
}

export type ElementsWithChildren = FrameNode | GroupNode | ComponentSetNode | ComponentNode | InstanceNode | BooleanOperationNode | SectionNode
export type Align = 'LT' | 'CT' | 'RT' | 'LM' | 'CM' | 'RM' | 'LB' | 'CB' | 'RB';

export interface Fill {
    color: {
        r: number,
        g: number,
        b: number,
    };
    opacity: number;
};