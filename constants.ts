
import { Card } from './types';

export const MAX_HAND_SIZE = 10;
export const MAX_TOKENS = 15;
export const CARDS_TO_DRAW_PER_TURN = 5;

export const BRANCH_EFFECTS: { [key: string]: { pros: string; cons: string } } = {
    "Algebra": { pros: "Start with +5 Tokens. Your Number cards deal +1 extra value.", cons: "The opponent's base damage is increased by 2." },
    "Geometry": { pros: "Start with +15 Player IP. Gain +5 Block for the first 3 turns.", cons: "Your cards cost +1 token more to play." },
    "Calculus": { pros: "Your 'Damage over Time' and 'Heal over Time' effects last 1 turn longer.", cons: "You start with 1 less card in your opening hand." },
    "Number Theory": { pros: "You gain +1 extra Token at the start of each turn.", cons: "Your Number cards have a 10% chance to deal 0 damage." },
    "Probability": { pros: "The range of all random effects (like random damage) is increased by 50%.", cons: "You have a 15% chance to lose 1 IP at the start of your turn." },
    "Complex Analysis": { pros: "Using Invert and Swap effects also heals you for 10 IP.", cons: "Theorem cards with Invert or Swap effects cost +2 tokens." },
    "Trigonometry": { pros: "Gain an Angle Slider to strategically boost your cards.", cons: "Cards that multiply/divide the opponent's IP are 25% more effective against you." }
};

export const ALL_CARDS: Card[] = [
    // Number Cards
    { name: 'Plus 5', icon: '➕5️⃣', type: 'Number', cost: 1, effect: 'direct_value_change', value: 5, target: 'opponent', description: 'Reduces opponent IP by 5.', summary: 'IP -5' },
    { name: 'Heal 10', icon: '❤️‍🩹', type: 'Number', cost: 2, effect: 'direct_value_change', value: 10, target: 'self', description: 'Increases your IP by 10.', summary: 'Own IP +10' },
    { name: 'Add 10', icon: '➕🔟', type: 'Number', cost: 2, effect: 'direct_value_change', value: 10, target: 'opponent', description: 'Reduces opponent IP by 10.', summary: 'IP -10' },

    // Action Cards
    { name: 'Multiply by 2', icon: '✖️2️⃣', type: 'Action', cost: 3, effect: 'multiply_ip', value: 2, target: 'opponent', description: 'Multiplies opponent IP by 2.', summary: 'Opponent IP x2' },
    { name: 'Divide by 2', icon: '➗2️⃣', type: 'Action', cost: 3, effect: 'divide_ip', value: 2, target: 'opponent', description: 'Divides opponent IP by 2.', summary: 'Opponent IP /2' },
    { name: 'Square IP', icon: '²️⃣', type: 'Action', cost: 4, effect: 'square_ip', target: 'self', description: 'Squares your own IP (e.g., 10 -> 100). High-risk self-buff.', summary: 'Self IP²' },
    { name: 'Square Root IP', icon: '√', type: 'Action', cost: 3, effect: 'square_root_ip', target: 'opponent', description: 'Takes the square root of opponent IP (e.g., 100 -> 10).', summary: '√Opponent IP' },
    { name: 'Absolute Value', icon: '📏', type: 'Action', cost: 2, effect: 'absolute_value_ip', target: 'self', description: 'Makes your negative or imaginary IP a positive real number.', summary: '|Self IP|' },
    { name: 'Derivative (d/dx)', icon: '📈', type: 'Action', cost: 4, effect: 'derivative_effect', branch: 'Calculus', target: 'opponent', description: 'Sets opponent IP to 0 (derivative of a constant is 0).', summary: 'Opponent IP = 0' },
    { name: 'Logarithm (ln(x))', icon: '🌳', type: 'Action', cost: 3, effect: 'logarithm_effect', branch: 'Algebra', target: 'opponent', description: 'Takes the natural logarithm of opponent IP. Only works on positive IP.', summary: 'ln(Opponent IP)' },
    { name: 'Draw Card', icon: '🃏', type: 'Action', cost: 1, effect: 'draw_card', value: 1, target: 'self', description: 'Draw one extra card.', summary: '+1 Card' },
    { name: 'Random Damage (1-10)', icon: '❓', type: 'Action', cost: 2, effect: 'random_damage', value: { min: 1, max: 10 }, target: 'opponent', description: 'Deals 1 to 10 random damage to the opponent.', summary: 'IP -Rand(1-10)' },
    { name: 'Reciprocal', icon: '1️⃣/x', type: 'Action', cost: 3, effect: 'reciprocal_ip', target: 'opponent', description: 'Takes the reciprocal of opponent IP (1/IP). Turns 100 into 0.01!', summary: '1/Opponent IP' },
    { name: 'Power of 0', icon: '⁰', type: 'Action', cost: 1, effect: 'power_of_zero', target: 'opponent', description: 'Sets opponent IP to 1 (unless their IP is 0).', summary: 'Opponent IP = 1' },
    { name: 'Copy IP', icon: '📋', type: 'Action', cost: 3, effect: 'copy_ip', target: 'self', description: 'Sets your IP to be equal to the opponent\'s current IP.', summary: 'Self IP = Opponent IP' },
    { name: 'Token Heist', icon: '💸', type: 'Action', cost: 2, effect: 'steal_token', value: 2, target: 'opponent', description: 'Steal 2 tokens from the opponent.', summary: 'Tokens -2 (Opponent)' },
    { name: 'Prime Decomposition', icon: '🧩', type: 'Action', cost: 3, effect: 'prime_factor_damage', branch: 'Number Theory', target: 'opponent', description: 'Deals damage equal to the largest prime factor of the opponent\'s IP (IP will be floored).', summary: 'Dmg = LPF(IP)' },
    { name: 'Negative Imaginary Square', icon: '(i)²', type: 'Action', cost: 3, effect: 'negative_imaginary_square', target: 'opponent', branch: 'Complex Analysis', description: "If opponent IP is imaginary, squares it to become a negative real number (i*x -> -x²).", summary: 'If i*IP, IP -> -IP²' },
    
    // Theorem Cards
    { name: 'Invert IP Sign', icon: '➖➕', type: 'Theorem', cost: 6, effect: 'invert_sign_ip', target: 'opponent', description: 'Changes the sign of opponent IP (e.g., 80 -> -80).', summary: 'Opponent IP -> -IP' },
    { name: 'Factorial (!)', icon: '🔢!', type: 'Theorem', cost: 5, effect: 'factorial_ip', branch: 'Number Theory', target: 'self', description: 'Replaces your IP with its factorial. Only works on integers between 0-12. High-risk.', summary: 'Self IP -> IP!' },
    { name: 'Gamma Function (Γ)', icon: 'Γ', type: 'Theorem', cost: 6, effect: 'gamma_function_ip', branch: 'Calculus', target: 'self', description: 'Applies the Gamma function (factorial\'s generalization) to your IP. High-risk.', summary: 'Self IP -> Γ(IP)' },
    { name: 'Pi (π)', icon: '🥧', type: 'Theorem', cost: 2, effect: 'divide_by_pi', branch: 'Geometry', target: 'opponent', description: 'Divides opponent IP by π, making it irrational.', summary: 'IP / π (Irrational)' },
    { name: 'Swap IPs', icon: '🔄', type: 'Theorem', cost: 4, effect: 'swap_ips', branch: 'Complex Analysis', description: 'Swap your IP with the opponent\'s IP.', summary: 'Swap IPs' },
    { name: 'Triangle Inequality', icon: '🔺', type: 'Theorem', cost: 5, effect: 'block_damage', branch: 'Geometry', value: 10, target: 'self', description: 'Block the next 10 damage you would take.', summary: 'Block 10 Damage' },
    { name: "Euler's Identity", icon: '✨', type: 'Theorem', cost: 10, effect: 'one_hit_ko_chance', branch: 'Complex Analysis', target: 'opponent', description: '50% chance to reduce opponent IP to 1.', summary: '50% Chance IP=1' },
    { name: 'Fibonacci Sequence', icon: '🐚', type: 'Theorem', cost: 3, effect: 'heal_over_time', value: 3, turns: 2, branch: 'Number Theory', target: 'self', description: 'Heal 3 IP per turn for 2 turns.', summary: 'Heal 3/Turn (2T)' },
    { name: 'Matrix Inversion', icon: '🔲', type: 'Theorem', cost: 5, effect: 'double_damage_next_turn', branch: 'Algebra', target: 'self', description: 'Your next damage-dealing card will deal double damage.', summary: 'Next Damage x2' },
    { name: 'Natural Number Set', icon: 'ℕ', type: 'Theorem', cost: 5, effect: 'natural_number_set_effect', branch: 'Number Theory', target: 'opponent', description: 'If the opponent\'s IP is irrational, sets it to 0.', summary: 'Irrational IP = 0' },
    { name: 'Riemann Hypothesis', icon: '❓', type: 'Theorem', cost: 12, effect: 'ultimate_damage', value: 30, branch: 'Number Theory', target: 'opponent', description: 'Deals a massive 30 damage, but has a very high cost.', summary: 'IP -30 (High Cost)' },
    { name: 'Hand Annihilator', icon: '✋', type: 'Theorem', cost: 4, effect: 'discard_hand', target: 'opponent', description: 'Forces the opponent to discard their entire hand.', summary: 'Opponent Discard Hand' },
    { name: 'Reflective Damage', icon: '🪞', type: 'Theorem', cost: 6, effect: 'reflect_damage', value: 0.5, turns: 1, target: 'self', description: 'On the next turn, reflect 50% of incoming damage back to the opponent.', summary: 'Reflect 50% Damage (1T)' },
    { name: 'Complex Rotation (×i)', icon: '🔄i', type: 'Theorem', cost: 5, effect: 'rotate_to_imaginary', branch: 'Complex Analysis', target: 'opponent', description: 'Makes the opponent\'s IP imaginary. Can protect from normal damage but opens vulnerability to cards like Square IP.', summary: 'IP -> i * IP' },
    { name: 'Real Projection (Re(z))', icon: 'Re(z)', type: 'Theorem', cost: 3, effect: 'real_projection', branch: 'Complex Analysis', target: 'opponent', description: 'If the opponent\'s IP is imaginary, sets it to 0.', summary: 'If i*IP, IP=0' },
    { name: 'Imaginary Annihilation (×i)', icon: '💥i', type: 'Theorem', cost: 4, effect: 'imaginary_annihilation', target: 'opponent', branch: 'Complex Analysis', description: "Multiplies an opponent's imaginary IP by 'i', turning it into a negative real number (i*x -> -x).", summary: 'If i*IP, IP -> -IP' },
    { name: "Euler's Transformation", icon: 'e^ix', type: 'Theorem', cost: 5, effect: 'eulers_transformation', target: 'opponent', branch: 'Complex Analysis', description: "Transforms the opponent's IP into the real part of e^(i*IP), which is cos(IP). Their IP will become a value between -1 and 1.", summary: 'IP -> cos(IP)' },
    { name: "De Moivre's Gambit", icon: '(cosθ+isinθ)ⁿ', type: 'Theorem', cost: 4, effect: 'de_moivres_gambit', target: 'opponent', branch: 'Complex Analysis', description: "If the opponent's IP is imaginary, raises it to a random power from 2 to 5. The result can be unpredictable!", summary: 'If i*IP, IP -> (i*IP)^n' },

    // Trigonometry Cards
    { name: 'Sine Wave', icon: '🌊', type: 'Action', cost: 3, effect: 'sine_wave_damage', value: 15, target: 'opponent', branch: 'Trigonometry', description: 'Deals (15 * sin(angle)) damage to the opponent. Most effective at 90°.', summary: 'Dmg = 15*sin(θ)' },
    { name: 'Cosine Shield', icon: '🛡️', type: 'Action', cost: 3, effect: 'cosine_shield', value: 20, target: 'self', branch: 'Trigonometry', description: 'Blocks (20 * cos(angle)) damage from the next attack. Most effective at 0°.', summary: 'Block = 20*cos(θ)' },
    { name: 'Law of Cosines', icon: '📐', type: 'Theorem', cost: 5, effect: 'deal_damage_based_on_ip_diff', target: 'opponent', branch: 'Trigonometry', description: 'Deals damage equal to (50% + 20% * cos(angle)) of the difference between your IP and the opponent\'s IP.', summary: 'Dmg by IP diff & angle' },
    { name: 'Secant Strike', icon: '⚡', type: 'Theorem', cost: 6, effect: 'secant_strike', value: 10, target: 'opponent', branch: 'Trigonometry', description: 'Deals (10 * sec(angle)) damage to the opponent. High-risk, high-reward! Extremely powerful near 90°.', summary: 'Dmg = 10*sec(θ)' },
    { name: 'Positive Tan', icon: '📐+', type: 'Action', cost: 3, effect: 'positive_tan', target: 'self', branch: 'Trigonometry', description: 'Multiply your IP by tan(angle). Control the boost with the angle slider.', summary: 'IP × tan(θ)' },
    { name: 'Positive Cot', icon: '📏+', type: 'Action', cost: 3, effect: 'positive_cot', target: 'self', branch: 'Trigonometry', description: 'Multiply your IP by cot(angle).', summary: 'IP × cot(θ)' },
    { name: 'Positive Cosec', icon: '🛡️+', type: 'Action', cost: 4, effect: 'positive_cosec', target: 'self', branch: 'Trigonometry', description: 'Multiply your IP by cosec(angle).', summary: 'IP × cosec(θ)' },
    { name: 'Negative Tan Avatar', icon: '⚡-', type: 'Avatar', cost: 2, effect: 'negative_tan_avatar', target: 'self', branch: 'Trigonometry', description: 'Recover from negative IP by multiplying it by -tan(angle).', summary: '-IP × -tan(θ)' },
    { name: 'Negative Cot Avatar', icon: '🔄-', type: 'Avatar', cost: 2, effect: 'negative_cot_avatar', target: 'self', branch: 'Trigonometry', description: 'Recover from negative IP by multiplying it by -cot(angle).', summary: '-IP × -cot(θ)' },
    { name: 'Negative Cosec Avatar', icon: '💚-', type: 'Avatar', cost: 3, effect: 'negative_cosec_avatar', target: 'self', branch: 'Trigonometry', description: 'Strong recovery from negative IP by multiplying it by -cosec(angle).', summary: '-IP × -cosec(θ)' },

    // Probability Cards
    { name: 'Coin Flip', icon: '🪙', type: 'Action', cost: 2, effect: 'coin_flip', target: 'opponent', branch: 'Probability', description: '50% chance to deal 20 damage, 50% chance for the opponent to heal 5 IP.', summary: '50/50: Dmg 20 / Heal 5' },
    { name: 'Dice Roll', icon: '🎲', type: 'Action', cost: 3, effect: 'dice_roll_damage', target: 'opponent', branch: 'Probability', description: 'Deals (random number from 1 to 6) * 3 damage to the opponent.', summary: 'Dmg = (1d6) * 3' },
    { name: 'Statistical Anomaly', icon: '📊', type: 'Theorem', cost: 5, effect: 'statistical_anomaly', target: 'opponent', branch: 'Probability', description: '10% chance to set the opponent\'s IP to a random value between 1 and 100.', summary: '10% Chance: IP -> Rand(1-100)' },
    { name: 'Random Walk', icon: '👣', type: 'Action', cost: 3, effect: 'random_walk', target: 'opponent', branch: 'Probability', description: 'Take 5 random steps. Each step has a chance to be +5 or -5 damage.', summary: '5 steps: ±5 each' },
    { name: 'Bell Curve', icon: '🔔', type: 'Action', cost: 4, effect: 'bell_curve', target: 'opponent', branch: 'Probability', description: 'Normal distribution: 70% chance for 12 damage, 30% chance for 25 damage.', summary: '70%:12dmg|30%:25dmg' },
    { name: 'Probability Boost', icon: '🎲', type: 'Action', cost: 5, effect: 'probability_boost', target: 'self', branch: 'Probability', description: 'For the next 3 turns, your cards have a 40% chance of an extra effect.', summary: '3 turns: 40% extra' },
    { name: 'Monte Carlo', icon: '🎰', type: 'Theorem', cost: 6, effect: 'monte_carlo', target: 'opponent', branch: 'Probability', description: 'Runs 100 random simulations to deal average damage.', summary: '100 sims damage' },
    { name: 'Chaos Theory', icon: '🌪️', type: 'Theorem', cost: 7, effect: 'chaos_theory', target: 'opponent', branch: 'Probability', description: 'Completely random effect: 20% chance for massive damage, 80% for a small effect.', summary: '20% massive | 80% small' },

    // More Number Theory Cards
    { name: 'Prime Check', icon: '🔍', type: 'Action', cost: 3, effect: 'prime_check', target: 'opponent', branch: 'Number Theory', description: 'Check if opponent IP is prime. Double damage if prime, half if not.', summary: 'Prime check damage' },
    { name: 'GCD Attack', icon: '🔗', type: 'Action', cost: 4, effect: 'gcd_attack', target: 'opponent', branch: 'Number Theory', description: 'Deals damage equal to the GCD of both players\' IPs.', summary: 'Dmg = GCD(IPs)' },
    { name: 'Modular Power', icon: '🔄', type: 'Action', cost: 5, effect: 'modular_power', target: 'opponent', branch: 'Number Theory', description: 'Sets opponent IP to their IP mod 17.', summary: 'IP = IP mod 17' },
    { name: 'Fibonacci Heal', icon: '🌀', type: 'Action', cost: 4, effect: 'fibonacci_heal', target: 'self', branch: 'Number Theory', description: 'Heals you for Fibonacci numbers over the next 4 turns (1, 1, 2, 3).', summary: 'Fib healing 4 turns' },
    { name: 'Perfect Square', icon: '□', type: 'Theorem', cost: 6, effect: 'perfect_square', target: 'self', branch: 'Number Theory', description: 'If your IP is near a perfect square, gain a massive boost.', summary: 'Perfect square boost' },
];
